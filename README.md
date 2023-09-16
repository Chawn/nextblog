This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Course Note

Course Link: [Full Stack React with Next.js 13 NextAuth & Serverless API](https://www.udemy.com/course/nextjs-nextauth-next-api-react/)

1. *`npx create-next-app@latest .`*
2. *`npm run dev`*
3. *`npm i bootstrap-material-design`*
4. create
   - `api/route.js`

5. create mongodb database and connect to nextjs
   - `config.js`
      ```javascript
      const DB_URI = "mongodb+srv://chawput:7cuiBk1X9Szq3bre@nextblog.g1hniwm.mongodb.net/?retryWrites=true&w=majority";
      module.exports = {
        DB_URI
      }
      ```

   - `next.config.js`
     ```javascript
     /** @type {import('next').NextConfig} */
     const config = require('./config');
     const nextConfig = {
       env: {
         DB_URI: config.DB_URI
       },
     };
     module.exports = nextConfig;
     ```

6. *`npm i mongoose bcrypt react-hot-toast`*
7. create `utils/dbConnect.js`
    ```javascript
    import mongoose from 'mongoose';

    const dbConnect = async () => {
      if (mongoose.connection.readyState >= 1) {
        return;
      }

      mongoose.connect(process.env.DB_URI);
    };

    export default dbConnect;

    ```
8. create models `user.js`
    ```javascript
    import mongoose from 'mongoose';

    const userSchema = new mongoose.Schema(
    {
      name: String,
      email: {
        type: String,
        required: true,
        index: true,
        lowercase: true,
      },
      password: String,
      role: {
        type: String,
        default: 'user',
      },
      image: String,
    },
    {
      timestamps: true,
    }
    );

    export default mongoose.models.User || mongoose.model('User', userSchema);
    ```

9.  create `api/register/route.js`
10. createa `app/register/page.js`
11. `npm i next-auth`
12. create `app/login/page.js`
13. add NEXTAUTH_SECRET to `config.js`, `next.config.js`
14. create `utils/authOptions.js`
15. create `api/auth/[...nextauth]/route.js`


16. `npm i react-quill`