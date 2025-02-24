# Create User management and Document management Application

## Purpose

We are create a application that's help to provide user management system there we can make user login and register. and assign to the user role. and as well to help get all users list and user can get your profile detail.

And document management as well so for these requirement I used a nestJS framework that is provide some best usable features

- Modular Architecture
- Typescript Support
- Dependency Injection
- Decorator and metadata
- Built-in middleware, gourds, interceptors, filters
- Exception handling
- Testing
- Security Features

## Installation of application

1. Clone the repository:

   ```bash
   git clone https://github.com/VivekMethew/jk-assessment.git
   ```

2. Install All dependencies

   ```bash
   npm install
   ```

3. Run migration

Migration file are created and we have run the query inside postgres sql editor. and sql must be copy and apply

```bash
npm run build
npm run prestart
```

4. Run Application

```bash
npm run start:dev
```

5. Run Test Cases Application

```bash
npm run test
```

## Auth management Features

- **Register User**

  User can register your self with putting input value that's required field email, password. then submit your. your will recieve a user detail.

- **Login**

  In this section user can login with username and password.
  payload would be {email:string,password:string}. and then get response with user detail and access_token. Token will help to provide accessibility to access private endpoints

- **Jwt Authentication**

  We are following jwt authentication in this application and we are created JwtStrategy and JwtAuthGourd. That help to validate endpoint iiif user authorize or not for this endpoint.

- **Role based Authentication**

  We are creted role base authentication in this application and user have one of the role user can access private api's and some are the api's base user role. like - roles admin, editor, viewer.
  Admin can adminstrate the endpoint and editor and viewer can you role base access perform.

## User management Features

- Get All Users
  This endpoint will help get all users list and this endpoint is protected route and admin can only access this features. and editor and viewer have get error forbidden.
- Get Profile
  A user can your profile but user must have to a any role he can get your profile detail.
  Example - admin, editor, viewer.

## Document management Features

- **Upload documents**
- **Read document content**
- **CRUD operations**

### Roles

- Admin - Admin will help adminstrate the requirements
- Editor - Editor help write editor performace
- Viewer - viewer can only views access

### These all module all completed. And integrate swagger document.

- Access document by below link

```base
http://localhost:5000/api-docs
```

**Note :** All the detail of api's related added in swagger document. You can access by above endpoint.



