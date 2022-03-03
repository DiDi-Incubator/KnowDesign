
const wrapCallBack = (fn: (...args: any[]) => void, once:boolean = false) => ({ callback: fn, once })

export class EventBus {
  events: Map<any, any>;

  constructor() {
    this.events = new Map();
  }

  // 添加函数
  on(type: string, fn: (...args: any[]) => void, once: boolean = false) {
    // 获取当前 type 的值
    let handle = this.events.get(type);

    // 包装传进来的函数
    const callback = wrapCallBack(fn, once);

    if (!handle) {
      // 如果当前 type 不存在
      handle = callback;
    } else if (!Array.isArray(handle)) {
      // 如果当前 type 存在，且不是数组，变成数组
      handle = [handle, callback];
    } else {
      // 如果当前 type 存在，且是数组，添加参数
      handle = [...handle, callback];
    }

    // 设置 type
    this.events.set(type, handle);
  }

  // 删除一个函数
  off(type: string, fn: (...args: any[]) => void) {
    let handle = this.events.get(type);

    if(!handle) return;

    if(!Array.isArray(handle)) {
      if(!(handle.callback.toString() === fn.toString()))
        return;

      this.events.delete(type)
    } else {
      handle = handle.filter(({callback}) => !(callback.toString() === fn.toString()));

      if(!handle.length) {
        this.events.delete(type)
      } else if(handle.lenth === 1) {
        this.events.set(type, handle[0]);
      } else {
        this.events.set(type, handle);
      }
    }
  }

   // 删除一个函数
   offByType(type: string, fn: (...args: any[]) => void) {
    let handle = this.events.get(type);

    if(!handle) return;

    if(!Array.isArray(handle)) {
      if(!(handle.callback.toString() === fn.toString()))
        return;

      this.events.delete(type)
    } else {
      handle = handle.filter(({callback}) => !(callback.type === (fn as any).type));

      if(!handle.length) {
        this.events.delete(type)
      } else if(handle.lenth === 1) {
        this.events.set(type, handle[0]);
      } else {
        this.events.set(type, handle);
      }
    }
  }

  // 删除所有函数
  removeAll(type: string) {
    const handle = this.events.get(type);

    if(!handle) return;

    this.events.delete(type);
  }

  // 执行函数
  emit(type: string, ...args: any[]) {
    const handle = this.events.get(type);

    if (!handle) return; 

    if (!Array.isArray(handle)) {
      handle.callback.apply(this, args);
    } else {
      // 存放只执行一次的函数
      const onceArray: (() => void)[] = [];

      handle.forEach(item => {
        item.callback.apply(this, args);

        if(item.once) {
          // 将只执行一次的函数存入数组中
          onceArray.push(item.callback);
        }
      });

      // 删除只执行一次的函数
      onceArray.forEach(item => this.off(type, item))
    }
  }

  // 添加只执行一次的函数
  once(type: string, fn: (...args: any[]) => void) {
    this.on(type, fn, true);
  }
}
