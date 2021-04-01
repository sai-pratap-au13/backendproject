# vehicle-Portal 

Project done by _Prateek and Sai_


# Contributors

-Prateek 
-Sai

# About Our Project:

●	Most of students, Job-seekers, workers and tourists face problems in other cities for transportation for a short span or days.
●	For temporary period no one wants to purchase vehicle. They seek vehicle on rent in good condition and at low price with or without driver.
●	On other hand most of people have their vehicle which are idle or not in use for long time. 
●	Here they can put their vehicle on rent to genuine customers and can earn some handsome amount.


## Users of Application

| Role              | Rights                                                                                                                                             |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| API Generator     | Maintenance of API                                                                                                                                 |
|                                                                                           |
| Owner      | Post vehicles, Delete vehicles, Update vehicles, Update Profile, Photo Upload, change password, Forgot Password, view all posted vehicles, view all opted out vehicles |
| Customer        | Accept vehicles, Update Profile, Upload Profile Pic, Reset Password, Forgot Password, view all available vehicles              |

### End Points of APIs

1.  Owner's ROUTES

    - Registering owner Account

      > POST api/user/register

    - Owner Account Activation

      > GET api/accountactivation/{Activation-Token}?user={Role}

    - Logging into owner Account

      > POST /api/user/login/

    - Posting a vehicle by owner

      > POST /api/owner/postingvehicle

    - Showing owner his own posted vehicles

      > GET /api/vehicleowner/vehiclespostedtilldate/{Page Number}/

    - Vehicle updation by owner Account

      > PATCH api/vehicleowner/udpatingvehicle/{vehicle Id}/

    - Vehicel Deletion by owner

      > DELETE api/vehicelowner/deletingvehicel/{vehicel Id}/

   


       * forgot passsword sending system generated password
          >  POST api/user/forgotpassword

2.  customer's ROUTES

    - Register customer Account

      > POST https://rentmecar7.herokuapp.com/api/user/register

    - Account Activation
      > GET https://rentmecar7.herokuapp.com/api/accountactivation/{Activation Token}?user=
             {Role}

    - Login into customer Account
      > POST https://rentmecar7.herokuapp.com/api/user/login

    - showing all vehicles which are available
       > GET https://rentmecar7.herokuapp.com/api/customer/vehicelsearch/allavailablevehicles/{Page Number}/


       * filtering vehicels 
          > GET https://rentmecar7.herokuapp.com/api/customer/vehicelsearch/filter/{Page Number}?category={name/color/}

       * showing single vehicle by vehicleId
          > GET https://rentmecar7.herokuapp.com/api/customer/vehicelsearch/byvehicleId/{vehicle Id}/

       * vehicle Accepting by customer
            > PATCH https://rentmecar7.herokuapp.com/api/customer/vehicelsearch/byvehicleid/{vehicle Id}/isaccepted

       * showing vehicles accepted by customer till date
            > GET https://rentmecar7.herokuapp.com/api/customer/vehiclesacceptedtilldate/{Page Number}

       *  Uploading Profile Picture
            > PATCH https://rentmecar7.herokuapp.com/api/customer/uploadprofilepicture

       * udpating profile
            > PATCH https://rentmecar7.herokuapp.com/api/customer/editprofile

       * Edit password
            > PATCH https://rentmecar7.herokuapp.com/api/customer/editpassword


       * Logging out from customer Account
           > DELETE https://rentmecar7.herokuapp.com/api/customer/logout

       * forgot passsword sending system generated password
            > POST https://rentmecar7.he

# Features :

### \* REGISTRAION & LOGIN Related

---

1.  ToKen Verification for Registration.
2.  Only Unique Account Creation allowed (Aadhaar Number based Uniqueness).
3.  Editing Password (After login).
4.  Resetting Passwords (System Generated Password via mail).

### \* USER's Related

---

1.  vehicle owner can Post, Edit, view and Delete his posts.
2.  vehicle customer can view, filter, search and accept vehicles.


### \* vehicles Related

---

1. **Aggregations** :
   - a. vehicle Count.
   - b. Sorting (as per Most Recent Update).
   - c. Filteration (_As per Different category and preferences_).
   - d. Searching (_On the basis of keyword and location_) .
   - e. Pagination (_10 vehicles per page_).
2. _View vehicles_.


# Technologies used:

---

- Nodemailer (_To send system generated emails_)
- Multer + Cloudinary (_Converting System Image into URL_)
- Express Js (_Framework for node Js_)
- Json Web token (_For Authentication_)
- Bcrypt Js (_For Hashing_)
- Helmet (_To Secure all Headings and Status_)
- Compressor (_To compress the size of the data_)
- Mongoose (_To Connect to NoSQL Database_)
- Mark Down (_To Make our read me file look better_)

# Future Goals :

      1. Denial of vehicle after acceptance from owner side and also from customer side.
      2. Location Mapping
      3. Online Payment Wallet (To avail Our commission)
      4. Customer's grievance Support System
      5. Mobile Application Implementation
      6. Mobile OTP for login
      7. Login Via Google/ Facebook/ Insta/ Twitter
      8. Background Verification
      9. GPS tracking
