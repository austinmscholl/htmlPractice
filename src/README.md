# Shift Manager (front end)

This repo represents the front end React application created by Austin Scholl of Eleven Fifty Academy.

View the deployed application (in its current state) at <a href="https://shiftmanager-client.herokuapp.com">https://shiftmanager-client.herokuapp.com</a>

Back-end repository: <a href="https://github.com/austinmscholl/shiftmanager-server">https://github.com/austinmscholl/shiftmanager-server</a>

# Features:

- Single page app format with a central switch statement that renders one of four possible interfaces:

  - Public: A login/signup interface
  - Nurse: A list of shifts (by hospital) with inputs for submitting responses and a grade value if (assigned)
  - Instructions: A table of shifts (create, edit, delete) with modal for fetching nurse submissions and assigning grades
  - Admins: A list of all users for assigning upgrading user credentials (for assigning new hospitals) or deleting users

- Authentication required for all queries to the back end (JWT credentials circulated throughout components by way of Context)

- Reusable component for substituting foreign keys with data (e.g. showing first and last names associated with shifts or submissions)

* Sample nurse credentials:

  - email: `nurse@nurse.com`
  - password: `nurse`

* Sample hospital credentials:

  - email: `hospital@hospital.com`
  - password: `hospital`

* Sample admin credentials:

  - by request only
