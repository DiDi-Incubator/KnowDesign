import NProgress from './NProgress';

const SingleWrapper = (fn: any) => {
  let instance: any;
  return function (config: any) {
    if (!instance) {
      instance = new fn(config);
    }
    return instance;
  };
};
const singleProgress = SingleWrapper(NProgress as any);
const Progress = (function ProgressBar(props?: any) {
  return singleProgress(props);
})();

export default Progress;
