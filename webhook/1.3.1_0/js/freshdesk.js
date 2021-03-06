SupportNotifications.providers.Freshdesk =
    new SupportNotifications.TicketProvider("Freshdesk",
      { password: ""
      , username: ""
      , companyId: "company"
      , filterName: "new_my_open"
      , protocol: "http"
      });

Freshdesk = {
  _callFreshdesk: function(url, username, password) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false,
      username || this.username, password || this.password);
    xhr.send();
    return xhr;
  },

  afterLoad: function() { if (this.filterName == null || this.filterName == undefined || this.filterName == "")
      this.filterName = "new_my_open"
    if (this.protocol != "https")
      this.protocol = "http"
  },

  // Returns template data for the authentication form
  formData: function() {
    return {
      companyId: this.companyId,
      checked: this.enabled ? "checked" : "",
      username: this.username,
      filterName: this.filterName,
      use_https: this.protocol == "https" ? "checked" : ""
    };
  },

  getTicketData: function() {
    var ticketsURL = this.getTicketsURL().replace(/\?.+$/, ".json?filter_name=" + this.filterName);
    var xhr = this._callFreshdesk(ticketsURL);
    var tickets = JSON.parse(xhr.responseText).sort(function(a, b) {
      if(a.updated_at < b.updated_at) {
        return 1;
      } else {
        return -1;
      }
    });

    var latest = null;
    for(index in tickets) {
      var ticket = tickets[index];
      if(latest == null || ticket.created_at > latest.created_at) {
        latest = ticket;
      }
    }
    return {tickets: tickets, latest: latest, total: tickets.length};
  },

  getTicketURL: function(ticket) {
    return this.protocol + "://" + this.companyId +
            ".freshdesk.com/helpdesk/tickets/" + ticket.display_id;
  },

  getTicketsURL: function(protocol, companyId) {
    var cmp = companyId || this.companyId;
    var prot = protocol || this.protocol;
    return prot + "://" + cmp + ".freshdesk.com/helpdesk/tickets?filter_name=" + this.filterName;
  },

  initFromForm: function(form) {
    this.enabled = form.enabled.checked;
    this.companyId = form.company_id.value;
    this.username = form.username.value;
    this.password = form.password.value;
    this.filterName = form.filter_name.value;
    this.protocol = form.use_https.checked ? "https" : "http";
  },

  /*
    Tests authentication with the credentials given in the form.
    Returns "valid", "invalid" or "unknown".
  */
  testCredentials: function(form) {
    var companyId = form.company_id.value;
    var username = form.username.value;
    var password = form.password.value;
    var protocol = form.use_https.checked ? "https" : "http";
    var url = this.getTicketsURL(protocol, companyId);
    try {
      var xhr = this._callFreshdesk(url, username, password);
      if(xhr.status === 200) {
        return "valid";
      } else if(xhr.status === 401 || xhr.status == 404) {
        return "invalid";
      } else {
        return "unkown";
      }
    }
    catch(error) {
      console.log("Failed to validate credentials!");
      console.log(error);
      return "unknown";
    }
  },
};
