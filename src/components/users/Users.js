import React from 'react';
import UserItem from './UserItem';

import Spinner from '../layout/Spinner';

import PropTypes from 'prop-types';

const Users = ({ users, loading }) => {
  Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridGap: '1rem',
    margin: '16px 0',
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="teste" >
        {users.Page && <p style={userStyle}>
          {`showing ${users.Page}-${users.PageSize} of ${users.TotalNumberOfResults}`}
        </p>}
        {users && users.ResultItems && users.ResultItems.map((user) => (
          <UserItem key={user.DocumentId} user={user} query={users.query}/>
        ))}
      </div>
    );
  }
};

export default Users;
