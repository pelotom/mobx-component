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
var React = require("react");
var mobx_react_1 = require("mobx-react");
function default_1(Wrapped) {
    var MobxWrapper = (function (_super) {
        __extends(MobxWrapper, _super);
        function MobxWrapper() {
            return _super.apply(this, arguments) || this;
        }
        MobxWrapper.prototype.render = function () {
            return React.createElement(Wrapped, this.props.model);
        };
        return MobxWrapper;
    }(React.Component));
    MobxWrapper = __decorate([
        mobx_react_1.observer
    ], MobxWrapper);
    return MobxWrapper;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2QkFBOEI7QUFDOUIseUNBQXFDO0FBRXJDLG1CQUEyQixPQUErQztJQUd4RTtRQUEwQiwrQkFBbUM7UUFBN0Q7O1FBSUEsQ0FBQztRQUhDLDRCQUFNLEdBQU47WUFDRSxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUN2RCxDQUFDO1FBQ0gsa0JBQUM7SUFBRCxDQUFDLEFBSkQsQ0FBMEIsS0FBSyxDQUFDLFNBQVMsR0FJeEM7SUFKRDtRQURDLHFCQUFRO21CQUtSO0lBRUQsTUFBTSxDQUFDLFdBQWlELENBQUE7QUFDMUQsQ0FBQzs7QUFWRCw0QkFVQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgb2JzZXJ2ZXIgfSBmcm9tICdtb2J4LXJlYWN0J1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbjxNPihXcmFwcGVkOiBSZWFjdC5Db21wb25lbnRDbGFzczxNPiB8IFJlYWN0LlNGQzxNPikge1xuXG4gIEBvYnNlcnZlclxuICBjbGFzcyBNb2J4V3JhcHBlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDx7IG1vZGVsOiBNIH0sIHZvaWQ+IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChXcmFwcGVkLCB0aGlzLnByb3BzLm1vZGVsKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNb2J4V3JhcHBlciBhcyBSZWFjdC5Db21wb25lbnRDbGFzczx7IG1vZGVsOiBNIH0+XG59XG4iXX0=