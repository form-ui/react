// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export function debounce<T extends Function>(func: T, wait: number, immediate: boolean) {
	let timeout: NodeJS.Timeout | undefined;
	return function(this: any) {
		let context: any = this , args = arguments;
		var later = function() {
			timeout = undefined;
			if (!callNow) {
                func.apply(context, args);
            }
        };
        
        let callNow = immediate && !timeout;
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	} as any as T;
};