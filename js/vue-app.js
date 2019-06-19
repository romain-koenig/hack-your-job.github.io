'use strict';

new Vue({
  el: '#app-vue',
  data: {
    filtering: '',
    selectedCity: null,
    cities: data.cities,
    skills: data.skills,
    members: data.members,
    membersFilteredCount: data.members.length,
    contact: {
      success: false,
      error: null,
      member: null,
      email: null,
      title: null,
      body: null
    }
  },
  computed: {
    displayedMembers: function(){
      var filtered = this.filtered(this.members);
      return filtered.sort(function(member1, member2){
        return member1.name.localeCompare(member2.name);
      })
    }
  },
  methods: {
    filtered: function(members) {
      if (this.filtering === '' && !this.selectedCity) {
        this.membersFilteredCount = members.length;
        return members;
      }
      var filter = this.filtering.toLowerCase();
      var filteredList = members.filter(function(member) {
        if (this.selectedCity && member.cities.indexOf(this.selectedCity) === -1) {
          return false;
        }
        return JSON.stringify(member).toLowerCase().indexOf(filter) > -1;
      }.bind(this));
      this.membersFilteredCount = filteredList.length;
      return filteredList;
    }
  }
});
