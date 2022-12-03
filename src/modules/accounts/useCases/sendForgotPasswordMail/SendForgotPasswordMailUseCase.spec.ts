import { MailProviderInMemory } from "@modules/accounts/repositories/in-memory/MailProviderInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppErrors";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  })

  it("Should be able to send a forgot password mail to users", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail")

    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "user@example.com",
      name: "Biribau shofer",
      password: "4321",
    });

    await sendForgotPasswordMailUseCase.execute("user@example.com")

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if the user not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("kai@ju.br")
    ).rejects.toEqual(new AppError("User does not exists!"))
  });

  it("should be able to create a new users's token", async () => {
    const generateRefreshTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email: "user2@example.com",
      name: "Biribau shofer",
      password: "4321",
    });

    await sendForgotPasswordMailUseCase.execute("user2@example.com")

    expect(generateRefreshTokenMail).toHaveBeenCalled();
  })
})