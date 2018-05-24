const APIUtil = require("./api_util.js");
class FollowToggle {
  constructor(el, options) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id") || options.id;
    this.followState = this.$el.data("initial-follow-state")
      || options.followed ? "followed" : "unfollowed";
    this.render();
    this.handleClick();
  }

  render() {
    if(this.followState === "unfollowed") {
      this.$el.text("Follow!");
      this.$el.prop("disabled", false);
    } else if (this.followState === "followed"){
      this.$el.text("Unfollow");
      this.$el.prop("disabled", false);
    } else {
      this.$el.prop("disabled", true);
    }
  }

  handleClick() {
    this.$el.on("click", (e) => {
      e.preventDefault();
      let promise;
      if (this.followState === "followed") {
        this.followState = "unfollowing";
        promise = APIUtil.unfollowUser;
      } else {
        this.followState = "following";
        promise = APIUtil.followUser;
      }
      this.render();
      promise(this.userId).then(this.toggleFollow.bind(this));
    });
  }
  toggleFollow () {
    this.followState = this.followState === "following" ? "followed" : "unfollowed";
    this.$el.data("initial-follow-state", this.followState);
    this.render();
  }

}



module.exports = FollowToggle;
