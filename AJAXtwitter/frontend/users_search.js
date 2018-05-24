const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch {
  constructor (el) {
    this.$el = $(el);
    this.input = $(el).find('input[type="text"]');
    this.ul = $(el).find("ul");
    this.handleInput();
  }

  handleInput() {
    this.input.on('input', (e) => {
      APIUtil.searchUsers(this.input.val(), this.renderResults.bind(this));
    });
  }
  renderResults(results) {
    this.ul.empty();

    results.forEach(result => {
      const $li = $('<li></li>');
      const $button = $(`<button class="follow-toggle"></button>`);
      new FollowToggle($button, result);
      const user_url = `/users/${result.id}`;
      const $a = $(`<a href="${user_url}">@${result.username}</a>`);
      $li.append($a);
      $li.append($button);
      this.ul.append($li);
    });

    console.log(results);
  }
}

module.exports = UsersSearch;
