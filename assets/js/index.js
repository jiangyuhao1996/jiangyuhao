$.ajax({
    url: "/my/userinfo",
    headers:{
        Authorization: localStorage.getItem("token")
    },
    success: function(res){
        console.log(res)
        if(res.status !== 0){
            return layer.msg(res.message)
        }

        if(res.data.nickname){
            $(".welcome").text("欢迎 "+res.data.nickname)
        }else{
            $(".welcome").text("欢迎 "+res.data.username)
        }

        if(res.data.user_pic){
            $(".avatarDef").attr("src",res.data.user_pic)
            $(".avatar").hide()
        }else{
            $(".avatar").text(res.data.username[0].toUpperCase()).css("display","inline-block")
            $(".avatarDef").hide()
        }
    }
})