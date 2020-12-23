# Breaking Bad  
### Steps to run the project  
1. Clone the repository.  
2. cd to the project folder.  
3. npm install to install the necessary dependencies provided NodeJS is preinstalled.  
4. npm start to start the local dev server at localhost:3000.  

### Project Description  
Project UI is built using React and Bootstrap.  
Project purpose is to fetch data about characters like name,nickname,name of actor,character image,famous quotes etc by utilising APIs from breakingbadapi.com and display them with clean and responsive design.  

### Project components and their routes  
This project has two main components. The home component and the characterinfo component.
#### / - Root route  
The home component is rendered at this route. Here we fetch data of all characters from https://www.breakingbadapi.com/api/characters?category=Breaking+Bad and display them with search and filter by episodes functionalities incorporated. On clicking of a particular character card displayed as a list, the project routes to the /character route.  
#### /character - Character route  
The characterinfo component isrendered at this route. Here we display the character information in details with the character image. Also, utilising the character name, we fetch the famous quotes of the characters in the series and display the famous quotes as a list.
