var ros = new ROSLIB.Ros({
    url : 'ws://192.168.43.80:9090/'
  });
  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
  // Publishing a Topic
  // ------------------
  var cmdVel = new ROSLIB.Topic({
    ros : ros,
    name : '/cmd_vel',
    messageType : 'geometry_msgs/Twist'
  });
  var twist = new ROSLIB.Message({
    linear : {
      x : 0.1,
      y : 0.2,
      z : 0.3
    },
    angular : {
      x : -0.1,
      y : -0.2,
      z : -0.3
    }
  });
  cmdVel.publish(twist);
   var status = 0;
   var target_linear_vel = 0;
   var target_angular_vel = 0;
   var control_linear_vel = 0;
   var control_angular_vel = 0;
   var tag = 0;
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
         target_angular_vel = target_angular_vel + 0.1;
                status = status + 1;
    }
    else if(event.keyCode == 38) {
         target_linear_vel = target_linear_vel + 0.01;
                status = status + 1;
    }
    else if(event.keyCode == 39) {
      target_angular_vel = target_angular_vel - 0.1;
                status = status + 1;
    }
    else if(event.keyCode == 40) {
        target_linear_vel = target_linear_vel - 0.01;
                status = status + 1;
    }
    else if(event.keyCode == 32) {
		status= status+1;
        	target_linear_vel   = 0;
                control_linear_vel  = 0;
                target_angular_vel  = 0;
                control_angular_vel = 0;
    }
    else if(event.keyCode == 48) {
                tag = 0;
                status = status + 1;
                target_linear_vel   = 0;
                control_linear_vel  = 0;
                target_angular_vel  = 0;
                control_angular_vel = 0;
        
    }
    else if(event.keyCode == 49) {
        	tag = 1;
                status = status + 1;
                target_linear_vel   = 0;
                control_linear_vel  = 0;
                target_angular_vel  = 0;
                control_angular_vel = 0;
    }
    else if(event.keyCode == 50) {
        	 tag = 2
                status = status + 1;
                target_linear_vel   = 0;
                control_linear_vel  = 0;
                target_angular_vel  = 0;
                control_angular_vel = 0;
    }
    else if(event.keyCode == 51) {
        	 tag = 3;
                status = status + 1;
                target_linear_vel   = 0;
                control_linear_vel  = 0;
                target_angular_vel  = 0;
                control_angular_vel = 0;
    }
    else if(event.keyCode == 52) {
        	tag = 4;
                status = status + 1;
                target_linear_vel   = 0;
                control_linear_vel  = 0;
                target_angular_vel  = 0;
                control_angular_vel = 0;
    }
    if(target_linear_vel> control_linear_vel){
		 control_linear_vel = Math.min( target_linear_vel, control_linear_vel + (0.01/4.0)); 
	}
   else{
                control_linear_vel = target_linear_vel;}
            if (target_angular_vel > control_angular_vel){
                control_angular_vel = Math.min( target_angular_vel, control_angular_vel + (0.1/4.0) );}
            else{
                control_angular_vel = target_angular_vel;}
    
	var twist = new ROSLIB.Message({
    linear : {
      x : control_linear_vel,
      y : tag,
      z : 0
    },
    angular : {
      x : 0,
      y : 0,
      z : control_angular_vel
    }
  });
  cmdVel.publish(twist);
});
