This is a starter template for [Learn Next.js](https://nextjs.org/learn).

# Enviroment setup and installtion of project

Install Node Js 12.16.1, This is they same version which is well tested while developing the project.
Install yarn or npm package manager, throught this document we will be making use of command based on yarn package manager,However npm can also be user.

# Technology Stack Used:

1 Typescript.
2 React Js.
3 React- NextJs Framework.
4 D3 Graphs.

# Environment Setup:
   Install node latest stable version and the time of development, the version used is 12.16.1.
# Install yarn package manager. 
The project is configured with typescript, please use tsconfig.js to make any changes in configuration, however no configuration changes are required.

# Running the project:
Go inside project root directory, where package.json file is present and execute following commands:
npm run dev

# Building the project:
Go inside project root directory, where package.json file is present and execute following commands:
npm run build
            The above command will create optimized build present inside build directory.


# Deploying the project:
After successfully build, do the following:
Push all the changes in local to master.
Go to Faceit Ec2 Instance.
Go inside the repository
Run command - git pull
Run command - npm install
Run command - npm run build
Run command - pm2 delete arc-ui (Stop any currently running pm2 instance of arc-ui)
(**Make sure pm2 is installed globally using npm i pm2 -g)


# Project Structure:
 The project is created with the help of next js so that advanced features like ssr and optimization of production build, optimized routing can be integrated easily.
	
	api > 
        api_template.ts
        constants.ts
    components >
        `ui-component` >
                ui-component.tsx
                ui-component.prop-type.ts
                index.tsx
        pages >
	        `page_name`>
                page_name.tsx
                page_name.prop-type.ts
 			    index.ts
		index.tsx
  		_app.tsx
		_document.js
	  public >
            assets >
	
    redux >
            actions > 
                *-actions.ts
            reducers >  
                *-reducers.ts
            store.ts
    stories >  
        Storybook-stories.ts
	 
    styles >
        Global.styles.css
    Utils >
		*-utility files and packages


a.) api : contains api_template folder where all the api template for get,post request will reside. Contents.ts folder inside api directory will contain all the constant api route keys.

b.) components: directory will contain all the ui element required commonly across the application, some of examples are like header, footer, loaders, error-display etc. The directory also contain component like graph component and different kind of other ui elements used in pages.

c.) pages: This is important to be on root as this directory structure is according to the next js suggested framework, each sub-directory inside the will create a application route, through which you can access the view element present inside the directory. Each directory will automatically render the content in backend (i.e it will support server side rendering) which will automatically optimize the pages for seo.For example the dashboard directory content inside the pages will be served as `http://BASE_URL/dashboard`. Make sure that each directory includes index.ts and a default export inside it. 

d.) public: This is the parent directory for all the static resource inside this directory all the images or assets can be directly accessed with the prefix of base url, the next server will automatically serve all content of public as static resources.

e.) redux: This is for managing global state in the application, please refer to the redux documentation, to learn more about it. In our project all the actions and reducers associated with the redux are inside the subdirectory of this folder. Apart from that the store file contains the code for creating the global store. It consists of redux persist also which is responsible for creating global store.

f.) stories: This directory is for only development purpose and for the purpose of running the storybook. Storybook is way to manage and design the ui component in large scale react project.This directory	contains stories for different component and pages in our application.

e.) styles: This folder contains global stylesheets used across the project. This stylesheets need to be imported inside _app.tsx

g.) utils: This folder contains all the utility files, functions and constants required across the project.


