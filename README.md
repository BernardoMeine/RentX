 # Car registration

 **FR (Functional requirement)**
 It should be able to registrate a new car.

 **BR (Business Rule)**
 It should not be possible to register a car with an existing license plate.
 A new car must be registered always as available.
 * The user responsible for the registration must be an admin user.


 # Car listing

 **FR**
 It should be possible to list all the available cars.
 It should be possible to list all the available cars by the categories's name.
 It should be possible to list all the available cars by the brand's name.
 It should be possible to list all the available cars by the car's name.

 **BR**
 It should be possible to list the cars without being logged in.


 # Car specification registration

 **FR**
 It should be possible to register an specification for a car.

 **BR**
 It should not be possible to register a specification for a non-registered car.
 It should not be possible to register the same specification twice for the same car.
 The user responsible for the registration must be an admin user.


 # Car images registration

 **FR**
 It should be possible to register the car's image.

 **NFR**
 Utilize multer for the files upload.

 **BR**
 The user should be able to register more than one image for the same car.
 The user responsible for the registration must be an admin user.


 # Car rental

 **FR**
 It should be possible to register a new rental.

 **BR**
 The rental should last at least 24 hours.
 It should no be possible to register a new rental in case there is one open for the same user.
 It should no be possible to register a new rental in case there is one open for the same car.
