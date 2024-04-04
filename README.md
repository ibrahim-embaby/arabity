# Arabity

Arabity connects car owners with qualified mechanics for routine maintenance or
repairs.

Whether you need routine maintenance such as oil changes and brake inspections,
or more extensive repairs, Arabity makes it easy to connect with reputable
mechanics who have the skills and expertise to get the job done right. By using
Arabity, car owners can feel confident that their vehicles are in good hands and
receive top-notch service.

[Demo - Visit Now](https://arabity.netlify.app) 🚀

[![Netlify Status](https://api.netlify.com/api/v1/badges/0e7c6d6c-af6c-4f72-a68d-7413e95dd772/deploy-status)](https://app.netlify.com/sites/arabity/deploys)

## 🖥️ Tech Stack

**Frontend:**

![reactjs](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)&nbsp;
![react-router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;
![redux-toolkit](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)&nbsp;
![PWA](https://img.shields.io/badge/pwa-570fc2?style=for-the-badge&logo=PWA&logoColor=white)&nbsp;

**Backend:**

![nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;
![expressjs](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![mongodb](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;
![jwt](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)&nbsp;
![amazons3](https://img.shields.io/badge/Amazon%20S3-569a31?style=for-the-badge&logo=amazons3&logoColor=white)&nbsp;

**Realtime Communication:**

![socketio](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)

**Deployed On:**

![netlify](https://img.shields.io/badge/netlify-32e6e2?style=for-the-badge&logo=netlify&logoColor=white)

## 🚀 Features

- ✅ Login/Signup User/Mechanic Account
- ✅ Full Authentication & Authorization System
- ✅ Update Profile/Password User Account
- ✅ Search Mechanic Accounts by Province, Car Model, and Service Type
- ✅ Results Pagination
- ✅ View Mechanic Profiles
- ✅ Rate on Mechanic
- ✅ User/Mechanic Post & Comment feature
- ✅ Real Time User-to-Mechanic Chat
- ✅ Multilingual (Arabic/English)
- ✅ Emoji Enabled (Emoji Mart)
- ✅ Reset Password Mail using Nodemailer

## ⌛ Upcoming Features

- 🚧 User Notfications
- 🚧 Search Results Sorting
- 🚧 Search By City After Selecting Province
- 🚧 Admin Dashboard

## Sneak Peek of Website Pages ✨:

![home](images/img-1.png)

<table>
  <tr>
    <td><img src="images/img-2.png" alt="mockup" /></td>
    <td><img src="images/img-3.png" alt="mockups" /></td>
  </tr>
  <tr>
    <td><img src="images/img-4.png" alt="mockup" /></td>
    <td><img src="images/img-5.png" alt="mockups" /></td>
  </tr>
  <tr>
    <td><img src="images/img-6.png" alt="mockups" /></td>
  </tr>
</table>

## Usage

### Env Variables

Create a .env file in the server folder and add the following

```
PORT=8000
MONGO_URI= your mongodb uri
ACCESS_TOKEN_SECRET=access_token_secret
REFRESH_TOKEN_SECRET=refresh_token_secret
ACTIVATION_SECRET_KEY=activation_secret_key
RESET_PASSWORD_SECRET_KEY=reset_password_secret_key
CLIENT_URL=http://localhost:3000
SEND_IN_BLUE_USERNAME= your sendinblue username
SEND_IN_BLUE_PASSWORD= your sendinblue password
REDIS_HOST= your redis host
REDIS_PASSWORD= your redis password
AWS_IAM_ACCESS_KEY= your Aws IAM access key
AWS_IAM_SECRET_ACCESS_KEY= your Aws IAM secret access key
AWS_S3_BUCKET_NAME= your Aws S3 bucket name
AWS_S3_BUCKET_REGION= your Aws S3 region
```

Create a .env file in the client folder and add the following

```
REACT_APP_SERVER_URL=http://localhost:8000
```

### Install Dependencies (frontend & backend)

```
cd client
npm i
cd ../server
npm i
```

### Run

```
# Run frontend (:3000)
npm start

# Run backend (:8000)
npm run dev
```

## 📬 Contact

If you want to contact me, you can reach me through below handles.

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ibrahim-embaby)

© 2024 Ibrahim Mohamed
