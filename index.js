!(function(global, factory) {
  if(typeof exports === "object" && typeof module !== "undefined"){
   module.exports = factory()
  }else if(typeof define === "function" && define.amd){
   define(factory)
  }else{
   global.Floater = factory()
  }
})(typeof window !== "undefined" ? window : this, function() {
 var lastTime = 0;
 var vendors = ['webkit', 'moz'];
 for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
     window.requestAnimationFrame = w[vendors[x] + 'RequestAnimationFrame'];
     window.cancelAnimationFrame =
         w[vendors[x] + 'CancelAnimationFrame'] || w[vendors[x] + 'CancelRequestAnimationFrame'];
 }
 if (!window.requestAnimationFrame){
     window.requestAnimationFrame = function (callback) {
         var currTime = new Date().getTime();
         var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
         var id = window.setTimeout(function () { callback(currTime + timeToCall); },
             timeToCall);
         lastTime = currTime + timeToCall;
         return id;
     };
 }

 if (!window.cancelAnimationFrame){
     window.cancelAnimationFrame = function (id) {
         clearTimeout(id);
     };
 }

 const Floater = function(opt) {
   this.dom = opt.dom;
   this.bodyW = opt.bodyW;
   this.bodyH = opt.bodyH;
   this.x = opt.x;
   this.y = opt.y;
   this.direction =opt.speed > 0 ? [opt.speed, -opt.speed] : [0.5, -0.5]; //方向和速度值
   this.speedX = 0;
   this.speedY = 0;
   this.timer = null;
   this.random()
 };

 Floater.prototype.start = function() {
   this.loop();
 };

 //随机方向
 Floater.prototype.random = function() {
   this.speedX = this.direction[
     parseInt(Math.random() * this.direction.length)
   ];
   this.speedY = this.direction[
     parseInt(Math.random() * this.direction.length)
   ];
 };

 //碰撞检测
 Floater.prototype.impact = function() {
   if (this.x + this.dom.clientWidth >= this.bodyW) {
     this.speedX = -this.speedX;
   } else if (this.x <= 0) {
     this.speedX = Math.abs(this.speedX);
   }

   if (this.y + this.dom.clientHeight >= this.bodyH) {
     this.speedY = -this.speedY;
   } else if (this.y <= 0) {
     this.speedY = Math.abs(this.speedY);
   }
 };
 //绘制
 Floater.prototype.render = function() {
   this.x += this.speedX;
   this.y += this.speedY;
   this.dom.style.left = this.x + "px";
   this.dom.style.top = this.y + "px";
 };

 //loop
 Floater.prototype.loop = function() {
   this.timer = window.requestAnimationFrame(this.loop.bind(this));
   this.render();
   this.impact();
 };

 Floater.prototype.end = function() {
   window.cancelAnimationFrame(this.timer);
 };

 return Floater;
});
