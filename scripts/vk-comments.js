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
        wrapper.innerHTML = renderComments(data.response.items, _.indexBy(data.response.profiles, 'id'))
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