/**
 * Author: Pi
 * Date: 2018/07/10 14:36:01
 * Desc: Simplify vuex configuration
 */

import Vue from "vue"

/**
 * Convert Conf files to vuex configuration
 * @param { Object } conf Conf files
 */
var Convert = function(conf) {
  const _this = this
  if (!(_this instanceof Convert)) {
    return new Convert(conf)
  }

  // Vuex Attribute
  _this.state = {}
  _this.getters = {}
  _this.mutations = {}
  _this.actions = {}
  _this.modules = {}

  // Public data
  let _public = conf["public"] || {}
  // Modules data
  let _modules = conf["modules"] || {}

  // cvt public data
  Object.keys(_public).forEach(function(v) {
    cvt(v, _public[v], _this)
  })

  // cvt modules data
  Object.keys(_modules).forEach(function(v) {
    let moduleItem = (_this["modules"][v] = {
      namespaced: true,
      state: {},
      getters: {},
      actions: {},
      mutations: {}
    })
    Object.keys(_modules[v]).forEach(function(mv) {
      cvt(mv, _modules[v][mv], moduleItem)
    })
  })

  /**
   * Convert to Vuex
   * @param { String } key Name
   * @param { * } value Value
   * @param { String } modules Modules name
   */
  function cvt(key, value, modules) {
    // The first letter should be capitalized.
    let attrName = toUppercaseFirst(key)
    // setName
    let setName = "set" + attrName
    // Storage Type
    let saveType = value.storage

    // Convert state
    if (getTypeof(value) === "object") {
      modules["state"][key] = value.value === undefined ? {} : value.value
    } else {
      modules["state"][key] = value
    }

    // Convert getters
    modules["getters"]["get" + attrName] = function(state) {
      let data = state[key]
      if (saveType === "local" || saveType === "session") {
        let localData = window[`${saveType}Storage`].getItem(key)
        if (localData !== null) {
          data = JSON.parse(localData || null)
          // sync state
          Vue.set(state, key, data)
        }
      }
      // Forward
      if (typeof value.getters === "function") {
        return value.getters(state, key)
      }
      return data
    }
    // Convert actions
    if (value.actions !== false) {
      modules["actions"][setName] = function({ commit }, payload) {
        // Forward
        if (typeof value.actions === "function") {
          value.actions.apply(_this, [setName, ...arguments])
        } else {
          commit(setName, payload)
        }
      }
    }
    // Convert mutaions
    if (value.mutation !== false) {
      modules["mutations"][setName] = function(state, data) {
        Vue.set(state, key, data)
        if (saveType === "local" || saveType === "session") {
          window[`${saveType}Storage`].setItem(key, JSON.stringify(data))
        }
      }
    }
  }
  /**
   * return Data Type
   */
  function getTypeof(args) {
    return Object.prototype.toString
      .call(args)
      .replace(/\[object |\]/g, "")
      .toLocaleLowerCase()
  }
  /**
   * The first letter should be capitalized.
   * @param { String } Word
   */
  function toUppercaseFirst(word) {
    return word.replace(/( |^)[a-z]/g, function(L) {
      return L.toUpperCase()
    })
  }
}

export default Convert
