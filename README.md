# WorkshopAmplifyForum - `@amzn/workshop-amplify-forum`

This is an TypeScript adaptation of AWS Workshop [Build a message forum with Next.js and Amplify](https://catalog.us-east-1.prod.workshops.aws/workshops/9291fed8-6668-4a29-b2c2-5f66710b0fb0/en-US/)

```bash
$ bws create -n WorkshopAmplifyForum
$ cd WorkshopAmplifyForum
$ bws use -p WorkshopAmplifyForum -vs austyle/development
$ cd src/WorkshopAmplifyForum
$ brazil-build
```

1. Install Amplify CLI

```bash
$ npm install -g @aws-amplify/cli
```

2. Configure Amplify CLI to use your AWS credentials

```bash
$ amplify configure

- Specify the AWS Region: ap-northeast-2
- Specify the username of the new IAM user: amplify-cli-user
> In the AWS Console, click Next: Permissions, Next: Tags, Next: Review,
> & Create User to create the new IAM user. Then return to the command
> line & press Enter.
- Enter the access key of the newly created user:
? accessKeyId: (<YOUR_ACCESS_KEY_ID>)
? secretAccessKey: (<YOUR_SECRET_ACCESS_KEY>)
- Profile Name: amplify-cli-user
```

3. Initialize Amplify project

```bash
$ amplify init

? Do you want to use an existing environment? Yes
? Choose the environment you would like to use: tsdev
```

4. Deploy Amplify project

```bash
$ amplify push --y
```

5. Start Amplify project locally

```bash
$ brazil-build dev
```

6. Open browser and go to http://localhost:3000

7. Create an account and sign in

### Helpful Amplify commands

```bash
$ amplify status
$ amplify console
$ amplify publish
```
