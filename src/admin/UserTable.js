import React from "react";
import { Table, Button } from "reactstrap";

const UserTable = props => (
  <div id="admin">
    <h3>User Permissions</h3>
    <hr />
    <Table striped>
      <thead>
        <tr>
          <th>Role</th>
          <th scope="col">Last, First, Email</th>
          <th scope="col">Modify</th>
        </tr>
      </thead>
      <tbody>
        {props.users.map((user, id) => {
          return (
            <tr key={id}>
              <th scope="row">{user.permission}</th>
              <td>
                {user.lastName}, {user.firstName}, {user.email}
              </td>
              <td style={{ width: "10%" }}>
                <Button id={user.id} onClick={e => props.edit(e, user)}>
                  Edit
                </Button>
                {/* <Button id={user.id} onClick={props.delete}>
                  Delete
                </Button> */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </div>
); //Deleting users without deleting all of their shifts will crash the grading table.

export default UserTable;
