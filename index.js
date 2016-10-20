"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var mobx_react_1 = require('mobx-react');
function default_1(Wrapped) {
    var MobxWrapper = (function (_super) {
        __extends(MobxWrapper, _super);
        function MobxWrapper() {
            _super.apply(this, arguments);
        }
        MobxWrapper.prototype.render = function () {
            return React.createElement(Wrapped, this.props.model);
        };
        MobxWrapper = __decorate([
            mobx_react_1.observer
        ], MobxWrapper);
        return MobxWrapper;
    }(React.Component));
    return MobxWrapper;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxJQUFZLEtBQUssV0FBTSxPQUN2QixDQUFDLENBRDZCO0FBQzlCLDJCQUF5QixZQUV6QixDQUFDLENBRm9DO0FBRXJDLG1CQUEyQixPQUErQztJQUd4RTtRQUEwQiwrQkFBbUM7UUFBN0Q7WUFBMEIsOEJBQW1DO1FBSTdELENBQUM7UUFIQyw0QkFBTSxHQUFOO1lBQ0UsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDdkQsQ0FBQztRQUpIO1lBQUMscUJBQVE7dUJBQUE7UUFLVCxrQkFBQztJQUFELENBQUMsQUFKRCxDQUEwQixLQUFLLENBQUMsU0FBUyxHQUl4QztJQUVELE1BQU0sQ0FBQyxXQUFpRCxDQUFBO0FBQzFELENBQUM7QUFWRDsyQkFVQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBvYnNlcnZlciB9IGZyb20gJ21vYngtcmVhY3QnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uPE0+KFdyYXBwZWQ6IFJlYWN0LkNvbXBvbmVudENsYXNzPE0+IHwgUmVhY3QuU0ZDPE0+KSB7XG5cbiAgQG9ic2VydmVyXG4gIGNsYXNzIE1vYnhXcmFwcGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PHsgbW9kZWw6IE0gfSwgdm9pZD4ge1xuICAgIHJlbmRlcigpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFdyYXBwZWQsIHRoaXMucHJvcHMubW9kZWwpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1vYnhXcmFwcGVyIGFzIFJlYWN0LkNvbXBvbmVudENsYXNzPHsgbW9kZWw6IE0gfT5cbn1cbiJdfQ==