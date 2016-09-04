$(function() {

  var socket = io.connect('/')
  socket.on('open', function() {
    console.log('已连接')
  })
  var num = Math.random().toString().split('.')[1]
  $('.user-submit').click(function() {

    var username = $('.user-input').val()
    console.log(username)

    socket.emit('login', {userid:num, username:username})
    socket.on('login', function(obj) {
      console.log(obj.onlineCount)
    })
  })


  $('.user-talk').click(function() {
    var content = $('.user-speak').val()
    socket.emit('speak', {userid:num, content:content})
  })

  socket.on('speak', function(obj) {
    console.log(obj.userid)
    if(obj.userid == num) {
      $('.content-right').append(`<div class="content-wrapper"><div class="speaking-r">${obj.content}</div><span class="speaking-user-r">${obj.username}</span></div>`)
    } else {
      $('.content-left').append(`<div class="content-wrapper"><span class="speaking-user-l">${obj.username}</span><div class="speaking-l">${obj.content}</div></div>`)
    }
  })

})