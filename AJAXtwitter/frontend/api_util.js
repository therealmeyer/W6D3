const APIUtil = {
  followUser: id => {
    return $.ajax({
      method: "POST",
      url: `/users/${id}/follow`,
      dataType: "json",
    });
  },

  unfollowUser: id => {
    return $.ajax({
      method: "DELETE",
      url: `/users/${id}/follow`,
      dataType: "json",
    });
  },

  searchUsers: (queryVal, successFunc) => {
    return $.ajax({
      method: "GET",
      url: '/users/search',
      dataType: "json",
      data: {query: queryVal},
      success: (response) => successFunc(response)
    });
  }
};

module.exports = APIUtil;
