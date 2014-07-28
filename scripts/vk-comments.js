//get VK comments
 var VK = (function() {
  var generateURLparams = function(params) {
    var concatenator = function(a,v,k) {
      return a += k + '=' + v + '&'
    }
    return _.reduce(params, concatenator, '?')
  }

  var jsonpWrapper = document.querySelector('.jsonp-wrapper') || document.head

  var makeRequest = function(opts) {
    _.defaults(opts, {
      method: '',
      params: {},
      v: '5.21'
    })
    _.extend(opts.params, {
      callback: opts.callback,
      v: '5.23'
    })

    var call = document.createElement('script')
    call.src = 'https://api.vk.com/method/' + opts.method + generateURLparams(opts.params)
    jsonpWrapper.appendChild(call)
  }


  var handleComments = function(data) {
    if (data.error) {
      console.log('Сообщите Тиму (marinintim@gmail.com; vk.com/marinintim; @random_wind) об ошибке:', data.error)
    }
    else {
      var wrapper = document.querySelector('.comments-list')
      if(data.response.count > 0) {
        var regexp = /(.*)\[(\w+)\|(.+)\](.*)/
        var comments = data.response.items
        _.each(comments, function(item) {
          item.text = item.text.replace(regexp, '$1<a href="//vk.com/$2" title="$3">$3</a>$4')
        })
        var users = _.indexBy(data.response.profiles, 'id')
        if (typeof data.response.groups !== 'undefined') {
          var groups =  _.indexBy(data.response.groups, 'id')
          groups[-73044877].first_name = 'Фронтир'
          groups[-73044877].photo_50 = '/img/logo.jpg'
          groups[-73044877].screen_name = 'frontiermag'
          _.extend(users, groups)
        }
        wrapper.innerHTML = renderComments(comments, users)
      }
      else {
        wrapper.innerHTML = 'Здесь тихо и одиноко, %username%'
      }
    }
  }

  var getComments = function(postId) {
    makeRequest({
      method: 'wall.getComments',
      params: {
        owner_id: '-73044877', // Frontier community in VK
        post_id: postId,
        extended: 1
      },
      callback: 'VK.handleComments'
    })
  }

  var template = _.template(document.querySelector('.templates-comment').innerHTML)
  var renderComments = function(comments, users) {
    console.log(users)
    return _.reduce(comments, function(memo, obj, index) {
      return memo += obj.text.length > 0 ? template({comment: obj, user: users[obj.from_id]}) : ''
    }, '')
  }
  
  return {
    req: makeRequest,
    handleComments: handleComments,
    getComments: getComments
  }
})()