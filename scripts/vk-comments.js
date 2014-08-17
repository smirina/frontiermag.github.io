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

  var handleAttachment = (function(attach) {
    var strategy = {
      'photo': function(attach) {
        var link = attach.photo_2560 || attach.photo_1280 || attach.photo_807 || attach.photo_604 || attach.photo_130 || attach.photo_75
        var text = '[картинка]'
        return {link: link, text: text}
      }
    }
    var handle = function(attach) {
      if (typeof strategy[attach.type] === 'function') return strategy[attach.type](attach[attach.type])
      else return undefined
    }

    return handle
  })()

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
          console.log(item);
          item.text = item.text.replace(regexp, '$1$3$4')
          if(typeof item.attachments !== 'undefined') {
            item.attachments = _.map(item.attachments, handleAttachment)
          }
        })
        var users = _.indexBy(data.response.profiles, 'id')
        if (typeof data.response.groups !== 'undefined' && data.response.groups.length > 0) {
          var groups =  _.indexBy(data.response.groups, 'id')
          console.log(groups);
          if (typeof groups[73044877] !== 'undefined') {
            groups[-73044877] = groups[73044877]
            groups[-73044877].first_name = 'Фронтир'
            groups[-73044877].photo_50 = '/img/logo.jpg'
            groups[-73044877].screen_name = 'frontiermag'
          }
          _.extend(users, groups)
        }
        wrapper.innerHTML = renderComments(comments, users)
        if (data.response.count > 10) {
          wrapper.innerHTML += '<li><h3>Продолжение дискуссии &mdash;&nbsp;<a href="//vk.com/wall-73044877_' + VK.postId + '">в нашем сообществе в ВК</a></h3>'
        } else {
          wrapper.innerHTML += '<li><h3>Оставьте свой комментарий <a href="//vk.com/wall-73044877_' + VK.postId + '">в нашем сообществе в ВК</a></h3>'
        }
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
