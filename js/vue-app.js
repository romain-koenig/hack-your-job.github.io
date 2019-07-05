'use strict'

const getMembers = function () {

  const vueData = this

  fetch('job-hackers.json').then(response => {
    response.json().then(json => {
      vueData.members = json

      const cities = {}

      const skills = {}

      vueData.members.forEach(member => {

        member.cities.forEach(city => {
          if (cities.hasOwnProperty(city)) {
            cities[city]++
          } else {
            cities[city] = 1
          }
        })

        member.skills.forEach(skill => {
          if (skills.hasOwnProperty(skill)) {
            skills[skill]++
          } else {
            skills[skill] = 1
          }
        })

        member.mainCity = member.cities[0]

      })

      for (const city in cities) {
        vueData.cities.push({ name: city, members: cities[city] })
      }

      for (const skill in skills) {
        vueData.skills.push({ name: skill, members: skills[skill] })
      }
    })
  })
}

const memberContains = function (member, token) {
  if (!member) return false;
  if (caseNonSensitiveContains(member.name, token)) return true
  if (caseNonSensitiveContains(member.title, token)) return true
  for (let skill of member.skills) {
    if (caseNonSensitiveContains(skill, token)) return true
  }
  return false
}

const caseNonSensitiveLocaleContains = function (string, token) {
  if (token.length > string.length) return false

  const lowerString = string.toLowerCase()
  const lowerToken = token.toLowerCase()

  let tokenFound = false
  let currentCharIndex = 0

  while (!tokenFound && currentCharIndex <= lowerString.length() - lowerToken.length()) {
    tokenFound = lowerString.substring(currentCharIndex).localeCompare(lowerToken)
    currentCharIndex++
  }

  return tokenFound
}

new Vue({
  el: '#app-vue',
  mounted: getMembers,
  data: {
    filtering: '',
    selectedCity: null,
    selectedSkill: null,
    cities: [],
    skills: [],
    members: [],
    membersFilteredCount: 0,
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
    displayedMembers: function () {
      var filtered = this.filtered(this.members);
      return filtered.sort(function (member1, member2) {
        return member1.name.localeCompare(member2.name);
      })
    }
  },
  methods: {
    filtered: function (members) {
      if (this.filtering === '' && !this.selectedCity && !this.selectedSkill) {
        this.membersFilteredCount = members.length;
        return members;
      }
      var filter = this.filtering.toLowerCase();
      var filteredList = members.filter(function (member) {
        if (this.selectedCity && member.cities.indexOf(this.selectedCity) === -1) {
          return false;
        }
        if (this.selectedSkill && member.skills.indexOf(this.selectedSkill) === -1) {
          return false;
        }
        return memberContains(member, filter)
      }.bind(this));
      this.membersFilteredCount = filteredList.length;
      return filteredList;
    }
  }
});
