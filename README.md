# CSBP README

## Instructions
1. Install Node
  - https://nodejs.org/en/download
  - https://nodejs.org/en/download/package-manager

The project was written with Node version v18.17.1

2. Clone the repo

3. Run `npm install` in both back and front folders.
  - This should install dependencies from package.jsons.

4. Run frontend
  - Open new terminal
  - Go to /front/
  - Run `npm run dev`

5. Run backend
  - Open new terminal
  - Go to /back/
  - Run `npm run dev`

The app should be running now. The path to open the front should be perceivable from the frontend terminal.

.env files are kept in, for ease of use.


## Vulnerabilities

A01 broken access control - CWE-284 Improper Access Control
  - Lines 7-9 form tokenbased authorization control for accessing user resources. Currently, lines commented, anyone can send backend/api/user/:username formatted requests to backend. Uncommentting the lines form requirements so that if either a valid token is not provided, or that the requested users username does not match the username linked to the token, the server will return 401 with the message "invalid token". The checking and setting the token and user happens in utils/middleware, in functions tokenExtractor and userExtractor.

A04, cwe 256 plaintext storage of password
  - Safe checkbox in create user, controls whether the password is saved in hashed or unhashed form. Unhashed userinformation is saved in /back/data/users.json, and hashed in back/data/users_safe.json.

A07, CWE-521 Weak Password Requirements
  - User creation in back/router/users post function includes commented code. This code handles following password requirements: password ought to be length 9-50, password cannot be in the common passwords list, password cannot include the username, and password has to have 5 or more unique characters. The password list is only demonstrative, production should probably use something like https://github.com/danielmiessler/SecLists/blob/master/Passwords/500-worst-passwords.txt or other more extensive lists.
  An even better solution would be use a premade model system, such as mongoose, and assert validation requirements in the schema creation. Handmade solution was chosen for this exercise so the processes are easier to perceive and follow. One can very easily open the json files for example and look at the saved stuff. Proper application might include a third party database in which the information (users for example) is saved.

A02, CWE-259: Use of Hard-coded Password
  L


A07, CWE-384: Session Fixation



A09, CWE-778 Insufficient Logging
  - Logging in the app is commented out. The centralized logging exists in back/utils/logger. Currently logger only prints the passed information. But as explained in potential mitigations in the CWE site, one ought to implement the reporting based on the production environment. Example loggins exist in back/routes/users on lines 11-14, and 28-45. 11-14 reports if userinformation is asked without providing a token, and if name associated with the provided token is not the same as the requested one. 28-45 reports problems with user creation. Preferably logging should also include more information, for example origin of the request so that repeated attacks.

