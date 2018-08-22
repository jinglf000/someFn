/**
 * 摄像头 身份证读卡器公用接口
 * 依赖于jQuery
 * @author jinglf000
 * @date ###### Wed Aug 8 11:06:40 CST 2018
 */

(function() {
  // 摄像头控件，默认值
  var conf = {
    pid: '1e4e',
    vid: '6300'
  };

  /**
   * 日志
   * logAlert：是否需要通过alert打印日志
   * needLog：是否需要打印日志
   */
  var logAlert = false;
  var needLog = true;
  var log = {
    error: function(msg) {
      if (!needLog) return;
      var logMsg = logFormate(msg);
      console.error(logMsg);
      logAlert && alert(logMsg);
    },
    warn: function(msg) {
      if (!needLog) return;
      var logMsg = logFormate(msg);
      console.warn(logMsg);
      logAlert && alert(logMsg);
    },
    log: function(msg) {
      if (!needLog) return;
      var logMsg = logFormate(msg);
      console.log(logMsg);
      logAlert && alert(logMsg);
    }
  };


  /**
   * 身份证读卡器接口
   * 需要在执行的页面添加：<object id="CertCtl" TYPE="application/cert-reader" width=0 height=0"></object>
   * 并且是在安装好驱动和对应的web程序的情况下，只在IE下有效
   */

  /**
   * IDCard初始化方法
   * @param {ObjectDom} ele objectDOM对象
   */
  function IdCard(ele) {
    this.ele = ele;
  }
  // 连接设备
  IdCard.prototype.initConnect = function () {
    var res = this.ele.connect();
    var obj = JSON.parse(res);
    if (+obj.resultFlag === 0) {
      log.log('设备连接成功');
    } else {
      log.error('设备连接失败');
    }
  };
  // 断开设备
  IdCard.prototype.disconnect = function () {
    var res = this.ele.disconnect();
    var obj = JSON.parse(res);
    if (+obj.resultFlag === 0) {
      log.log('设备断开成功');
    } else {
      log.error('设备断开失败');
    }
  };
  // 读卡
  /**
   * @param {Functtion} cb 成功的回调函数
   * @param {Function} cb2 失败的回调函数
   */
  IdCard.prototype.readCard = function (cb, cb2) {
    var res = this.ele.readCert();
    var obj = JSON.parse(res);
    if (+obj.resultFlag === 0) {
      log.log('身份信息读取成功');
      if (typeof cb === 'function') {
        cb.call(this.ele, obj);
      }
    } else {
      log.error('身份信息读取失败');
      if (typeof cb2 === 'function') {
        cb2.call(this.ele, obj);
      }
    }
  };
  // 设备状态
  IdCard.prototype.getStatus = function () {
    var res = this.ele.getStatus();
    var obj = JSON.parse(res);
    if (+obj.resultFlag === 0) {
      log.log('成功');
    } else {
      log.error('失败');
    }
  };
  // 读卡失败重新读卡
  IdCard.prototype.reReadCart = function () {
    // this.
  };


  /**
   * 摄像头的相关参数在，硬件管理中查找 硬件id
   * @param {ObjectDOM} ele ObjectDOM 对象
   * @param {String} pid 摄像头的pid
   * @param {String} vid 摄像头的vid
   */
  function Camera (ele, pid, vid) {
    this.ele = ele;
    this.pid = pid || conf.pid;
    this.vid = vid || conf.vid;
  }

  /* 打开摄像头 */
  Camera.prototype.open = function () {
    this.ele.openCamera0(this.pid, this.vid);
  };

  /**
   * 拍照
   * @return {Promise} 返回Promise
   */
  Camera.prototype.takePhoto = function () {
    var res = this.ele.takePictureMap();
    var deferred = new $.Deferred();
    // 拍照成功
    if (res) {
      log.log('拍照成功' + res);
      deferred.resolve(res);
    } else {
      log.log('拍照失败');
      deferred.reject(res);
    }
    return deferred.promise();
  };
  /* 关闭摄像头 */
  Camera.prototype.close = function () {
    this.ele.closeCamera();
  };
  /**
   * 格式化日志
   * @param {String} msg 消息
   */
  function logFormate(msg) {
    return '[' + dateNow() + '] ' + msg;
  }

  /**
   * @return {String} 返回当前时间
   */
  function dateNow() {
    var date = new Date();
    var year = date.getFullYear();
    var mounth = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var second = date.getSeconds();
    return year + '-' + mounth + '-' + day + ' ' + hours + ':' + minutes + '' + second;
  }
  /* 输出 */
  window.tools = {
    IdCard: IdCard,
    Camera: Camera
  };
})();
