"use strict";
var React = require('react');
var mobx_react_1 = require('mobx-react');
// Option 1: wrap when creating the component
function wrapComponent(component) {
    var cached = exports._cache.get(component);
    if (cached)
        return cached;
    var wrapped = mobx_react_1.observer(function (_a) {
        var model = _a.model;
        return component(model);
    });
    exports._cache.set(component, wrapped);
    return wrapped;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = wrapComponent;
// Option 2: wrap when creating elements, leaves leaf components "pure"
function createElement(component, model) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    return React.createElement(wrapComponent(component), { model: model }, children);
}
exports.createElement = createElement;
// Private; exported only for testing
exports._cache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxLQUFLLFdBQU0sT0FDdkIsQ0FBQyxDQUQ2QjtBQUM5QiwyQkFBeUIsWUFHekIsQ0FBQyxDQUhvQztBQUVyQyw2Q0FBNkM7QUFDN0MsdUJBQXlDLFNBQXNDO0lBQzdFLElBQU0sTUFBTSxHQUFHLGNBQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDcEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ1QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtJQUVmLElBQU0sT0FBTyxHQUFHLHFCQUFRLENBQWUsVUFBQyxFQUFTO1lBQVAsZ0JBQUs7UUFBTyxPQUFBLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFBaEIsQ0FBZ0IsQ0FBQyxDQUFBO0lBQ3ZFLGNBQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzlCLE1BQU0sQ0FBQyxPQUFPLENBQUE7QUFDaEIsQ0FBQztBQVJEOytCQVFDLENBQUE7QUFFRCx1RUFBdUU7QUFDdkUsdUJBQWlDLFNBQXNDLEVBQUUsS0FBUTtJQUFFLGtCQUE4QjtTQUE5QixXQUE4QixDQUE5QixzQkFBOEIsQ0FBOUIsSUFBOEI7UUFBOUIsaUNBQThCOztJQUMvRyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxZQUFLLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQTtBQUMzRSxDQUFDO0FBRmUscUJBQWEsZ0JBRTVCLENBQUE7QUFFRCxxQ0FBcUM7QUFDeEIsY0FBTSxHQUFHLElBQUksR0FBRyxFQUE0RCxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBvYnNlcnZlciB9IGZyb20gJ21vYngtcmVhY3QnXG5cbi8vIE9wdGlvbiAxOiB3cmFwIHdoZW4gY3JlYXRpbmcgdGhlIGNvbXBvbmVudFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd3JhcENvbXBvbmVudDxNPihjb21wb25lbnQ6IFJlYWN0LlN0YXRlbGVzc0NvbXBvbmVudDxNPik6IFJlYWN0LkNvbXBvbmVudENsYXNzPHsgbW9kZWw6IE0gfT4ge1xuICBjb25zdCBjYWNoZWQgPSBfY2FjaGUuZ2V0KGNvbXBvbmVudClcbiAgaWYgKGNhY2hlZClcbiAgICByZXR1cm4gY2FjaGVkXG5cbiAgY29uc3Qgd3JhcHBlZCA9IG9ic2VydmVyPHsgbW9kZWw6IE0gfT4oKHsgbW9kZWwgfSkgPT4gY29tcG9uZW50KG1vZGVsKSlcbiAgX2NhY2hlLnNldChjb21wb25lbnQsIHdyYXBwZWQpXG4gIHJldHVybiB3cmFwcGVkXG59XG5cbi8vIE9wdGlvbiAyOiB3cmFwIHdoZW4gY3JlYXRpbmcgZWxlbWVudHMsIGxlYXZlcyBsZWFmIGNvbXBvbmVudHMgXCJwdXJlXCJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFbGVtZW50PE0+KGNvbXBvbmVudDogUmVhY3QuU3RhdGVsZXNzQ29tcG9uZW50PE0+LCBtb2RlbDogTSwgLi4uY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZVtdKSB7XG4gIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHdyYXBDb21wb25lbnQoY29tcG9uZW50KSwgeyBtb2RlbCB9LCBjaGlsZHJlbilcbn1cblxuLy8gUHJpdmF0ZTsgZXhwb3J0ZWQgb25seSBmb3IgdGVzdGluZ1xuZXhwb3J0IGNvbnN0IF9jYWNoZSA9IG5ldyBNYXA8UmVhY3QuU3RhdGVsZXNzQ29tcG9uZW50PGFueT4sIFJlYWN0LkNvbXBvbmVudENsYXNzPGFueT4+KClcbiJdfQ==