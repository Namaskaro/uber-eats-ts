interface Arguments {
  function: () => void;
  delay: number;
}

type ReturnFn<T extends (...args: any[]) => any> = T

export const useDebounce= (fn: (...args: any[]) => void, delay: number) => {
  let timer: number;

  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

const loggingInConsole = () => {
  console.log('Debounce is working')
}

const debounce = useDebounce(loggingInConsole,1000)

debounce()

console.log(debounce())

// export const useDebounce2: ReturnFn  = (fn: () => void, delay: number) => {
//   let timer: number;

//   return (...args: any[]) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(this, args);
//     }, delay);
//   };
// };