"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var browserEnv = require('browser-env');
browserEnv();
var ava_1 = require('ava');
var enzyme_1 = require('enzyme');
var React = require('react');
var mobx_1 = require('mobx');
var mobx_react_1 = require('mobx-react');
var _1 = require('.');
var Model = (function () {
    function Model() {
        this.x = 0;
    }
    Object.defineProperty(Model.prototype, "y", {
        get: function () { return this.x + 1; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        mobx_1.observable
    ], Model.prototype, "x", void 0);
    __decorate([
        mobx_1.computed
    ], Model.prototype, "y", null);
    return Model;
}());
ava_1.default.beforeEach(function (t) {
    _1._cache.clear();
});
ava_1.default('baseline: mobx-react wrapped props are observable', function (t) {
    var Component = mobx_react_1.observer(function (_a) {
        var model = _a.model;
        return React.createElement("label", null, 
            "x=", 
            model.x, 
            ", y=", 
            model.y);
    });
    var model = new Model();
    var wrapper = enzyme_1.mount(React.createElement(Component, {model: model}));
    t.is('x=0, y=1', wrapper.find('label').text());
    model.x++;
    t.is('x=1, y=2', wrapper.find('label').text());
});
ava_1.default('baseline: mobx-react unwrapped props are not observable', function (t) {
    var Component = mobx_react_1.observer(function (model) {
        return React.createElement("label", null, 
            "x=", 
            model.x);
    });
    var model = new Model();
    var wrapper = enzyme_1.mount(React.createElement(Component, __assign({}, model)));
    t.is('x=0', wrapper.find('label').text());
    model.x++;
    // The update has no effect
    t.is('x=0', wrapper.find('label').text());
});
ava_1.default('baseline: mobx-react unwrapped computed props don\'t show up', function (t) {
    var Component = mobx_react_1.observer(function (model) {
        return React.createElement("label", null, 
            "y=", 
            model.y);
    });
    var model = new Model();
    var wrapper = enzyme_1.mount(React.createElement(Component, __assign({}, model)));
    t.is('y=', wrapper.find('label').text());
});
ava_1.default('mobx-component unwrapped props are observable', function (t) {
    var Component = _1.default(function (model) {
        return React.createElement("label", null, 
            "x=", 
            model.x);
    });
    var model = new Model();
    var wrapper = enzyme_1.mount(React.createElement(Component, {model: model}));
    t.is('x=0', wrapper.find('label').text());
    model.x++;
    t.is('x=1', wrapper.find('label').text());
});
ava_1.default('mobx-component unwrapped computed props are preserved', function (t) {
    t.is(0, _1._cache.size);
    var Component = _1.default(function (model) {
        return React.createElement("label", null, 
            "y=", 
            model.y);
    });
    var model = new Model();
    var wrapper = enzyme_1.mount(React.createElement(Component, {model: model}));
    t.is('y=1', wrapper.find('label').text());
    model.x++;
    t.is('y=2', wrapper.find('label').text());
});
ava_1.default('createElement', function (t) {
    var Component = function (model) { return React.createElement("label", null, 
        "x=", 
        model.x, 
        ", y=", 
        model.y); };
    var model = new Model();
    t.is(0, _1._cache.size);
    var elem = _1.createElement(Component, model);
    t.is(1, _1._cache.size);
    var wrapper = enzyme_1.mount(elem);
    t.is('x=0, y=1', wrapper.find('label').text());
    model.x++;
    t.is('x=1, y=2', wrapper.find('label').text());
});
ava_1.default('caching createComponent', function (t) {
    var Component = function () { return React.createElement("div", null); };
    t.is(0, _1._cache.size);
    t.is(undefined, _1._cache.get(Component));
    // First creation; component wrapper gets cached
    _1.createElement(Component, {});
    t.is(1, _1._cache.size);
    var cached = _1._cache.get(Component);
    t.not(undefined, cached);
    // Second creation of same component; wrapper gets reused
    _1.createElement(Component, {});
    t.is(1, _1._cache.size);
    var cached2 = _1._cache.get(Component);
    t.is(cached, cached2);
    // Creating an element for a new component; gets cached separately
    _1.createElement(function () { return React.createElement("div", null); }, {});
    t.is(2, _1._cache.size);
    t.not(undefined, cached);
});
ava_1.default('caching createElement', function (t) {
    var Component = function () { return React.createElement("div", null); };
    t.is(0, _1._cache.size);
    t.is(undefined, _1._cache.get(Component));
    // First creation; component wrapper gets cached
    var wrapped = _1.default(Component);
    t.is(1, _1._cache.size);
    t.is(wrapped, _1._cache.get(Component));
    // Second creation of same component; wrapper gets reused
    var wrapped2 = _1.default(Component);
    t.is(1, _1._cache.size);
    t.is(wrapped, wrapped2);
    // Creating an element for a new component; gets cached separately
    var Component2 = function () { return React.createElement("div", null); };
    var wrapped3 = _1.default(Component2);
    t.is(2, _1._cache.size);
    t.is(wrapped3, _1._cache.get(Component2));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZGV4LnRlc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQVksVUFBVSxXQUFNLGFBQzVCLENBQUMsQ0FEd0M7QUFDekMsVUFBVSxFQUFFLENBQUE7QUFFWixvQkFBaUIsS0FDakIsQ0FBQyxDQURxQjtBQUN0Qix1QkFBc0IsUUFDdEIsQ0FBQyxDQUQ2QjtBQUM5QixJQUFZLEtBQUssV0FBTSxPQUN2QixDQUFDLENBRDZCO0FBQzlCLHFCQUFxQyxNQUNyQyxDQUFDLENBRDBDO0FBQzNDLDJCQUF5QixZQUV6QixDQUFDLENBRm9DO0FBRXJDLGlCQUFnRSxHQUVoRSxDQUFDLENBRmtFO0FBRW5FO0lBQUE7UUFDYyxNQUFDLEdBQVcsQ0FBQyxDQUFBO0lBRTNCLENBQUM7SUFEVyxzQkFBSSxvQkFBQzthQUFMLGNBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUMsQ0FBQzs7O09BQUE7SUFEdkM7UUFBQyxpQkFBVTtvQ0FBQTtJQUNYO1FBQUMsZUFBUTtrQ0FBQTtJQUNYLFlBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUVELGFBQUksQ0FBQyxVQUFVLENBQUMsVUFBQSxDQUFDO0lBQ2YsU0FBSyxDQUFDLEtBQUssRUFBRSxDQUFBO0FBQ2YsQ0FBQyxDQUFDLENBQUE7QUFFRixhQUFJLENBQUMsbURBQW1ELEVBQUUsVUFBQSxDQUFDO0lBQ3pELElBQU0sU0FBUyxHQUFHLHFCQUFRLENBQW1CLFVBQUMsRUFBUztZQUFQLGdCQUFLO1FBQ25ELE9BQUEscUJBQUMsS0FBSztZQUFDLElBQUU7WUFBQyxLQUFLLENBQUMsQ0FBRTtZQUFBLE1BQUk7WUFBQyxLQUFLLENBQUMsQ0FBRSxDQUFRO0lBQXZDLENBQXVDLENBQ3hDLENBQUE7SUFDRCxJQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0lBQ3pC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QUFHLEVBQVAsQ0FBTyxDQUFBO0lBQ2hDLElBQU0sUUFBUSxHQUFHLFVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUM1QyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxTQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgYnJvd3NlckVudiBmcm9tICdicm93c2VyLWVudidcbmJyb3dzZXJFbnYoKVxuXG5pbXBvcnQgdGVzdCBmcm9tICdhdmEnXG5pbXBvcnQgeyBtb3VudCB9IGZyb20gJ2VuenltZSdcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQgfSBmcm9tICdtb2J4J1xuaW1wb3J0IHsgb2JzZXJ2ZXIgfSBmcm9tICdtb2J4LXJlYWN0J1xuXG5pbXBvcnQgY3JlYXRlQ29tcG9uZW50LCB7IGNyZWF0ZUVsZW1lbnQsIF9jYWNoZSBhcyBjYWNoZSB9IGZyb20gJy4nXG5cbmNsYXNzIE1vZGVsIHtcbiAgQG9ic2VydmFibGUgeDogbnVtYmVyID0gMFxuICBAY29tcHV0ZWQgZ2V0IHkoKSB7IHJldHVybiB0aGlzLnggKyAxIH1cbn1cblxudGVzdC5iZWZvcmVFYWNoKHQgPT4ge1xuICBjYWNoZS5jbGVhcigpXG59KVxuXG50ZXN0KCdiYXNlbGluZTogbW9ieC1yZWFjdCB3cmFwcGVkIHByb3BzIGFyZSBvYnNlcnZhYmxlJywgdCA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IG9ic2VydmVyPHsgbW9kZWw6IE1vZGVsIH0+KCh7IG1vZGVsIH0pID0+XG4gICAgPGxhYmVsPng9e21vZGVsLnh9LCB5PXttb2RlbC55fTwvbGFiZWw+XG4gIClcbiAgY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoKVxuICBjb25zdCB3cmFwcGVyID0gbW91bnQoPENvbXBvbmVudCBtb2RlbD17bW9kZWx9IC8+KVxuICB0LmlzKCd4PTAsIHk9MScsIHdyYXBwZXIuZmluZCgnbGFiZWwnKS50ZXh0KCkpXG4gIG1vZGVsLngrK1xuICB0LmlzKCd4PTEsIHk9MicsIHdyYXBwZXIuZmluZCgnbGFiZWwnKS50ZXh0KCkpXG59KVxuXG50ZXN0KCdiYXNlbGluZTogbW9ieC1yZWFjdCB1bndyYXBwZWQgcHJvcHMgYXJlIG5vdCBvYnNlcnZhYmxlJywgdCA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IG9ic2VydmVyPE1vZGVsPihtb2RlbCA9PlxuICAgIDxsYWJlbD54PXttb2RlbC54fTwvbGFiZWw+XG4gIClcbiAgY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoKVxuICBjb25zdCB3cmFwcGVyID0gbW91bnQoPENvbXBvbmVudCB7Li4ubW9kZWx9IC8+KVxuICB0LmlzKCd4PTAnLCB3cmFwcGVyLmZpbmQoJ2xhYmVsJykudGV4dCgpKVxuICBtb2RlbC54KytcbiAgLy8gVGhlIHVwZGF0ZSBoYXMgbm8gZWZmZWN0XG4gIHQuaXMoJ3g9MCcsIHdyYXBwZXIuZmluZCgnbGFiZWwnKS50ZXh0KCkpXG59KVxuXG50ZXN0KCdiYXNlbGluZTogbW9ieC1yZWFjdCB1bndyYXBwZWQgY29tcHV0ZWQgcHJvcHMgZG9uXFwndCBzaG93IHVwJywgdCA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9IG9ic2VydmVyPE1vZGVsPihtb2RlbCA9PlxuICAgIDxsYWJlbD55PXttb2RlbC55fTwvbGFiZWw+XG4gIClcbiAgY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoKVxuICBjb25zdCB3cmFwcGVyID0gbW91bnQoPENvbXBvbmVudCB7Li4ubW9kZWx9IC8+KVxuICB0LmlzKCd5PScsIHdyYXBwZXIuZmluZCgnbGFiZWwnKS50ZXh0KCkpXG59KVxuXG50ZXN0KCdtb2J4LWNvbXBvbmVudCB1bndyYXBwZWQgcHJvcHMgYXJlIG9ic2VydmFibGUnLCB0ID0+IHtcbiAgY29uc3QgQ29tcG9uZW50ID0gY3JlYXRlQ29tcG9uZW50PE1vZGVsPihtb2RlbCA9PlxuICAgIDxsYWJlbD54PXttb2RlbC54fTwvbGFiZWw+XG4gIClcbiAgY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoKVxuICBjb25zdCB3cmFwcGVyID0gbW91bnQoPENvbXBvbmVudCBtb2RlbD17bW9kZWx9IC8+KVxuICB0LmlzKCd4PTAnLCB3cmFwcGVyLmZpbmQoJ2xhYmVsJykudGV4dCgpKVxuICBtb2RlbC54KytcbiAgdC5pcygneD0xJywgd3JhcHBlci5maW5kKCdsYWJlbCcpLnRleHQoKSlcbn0pXG5cbnRlc3QoJ21vYngtY29tcG9uZW50IHVud3JhcHBlZCBjb21wdXRlZCBwcm9wcyBhcmUgcHJlc2VydmVkJywgdCA9PiB7XG4gIHQuaXMoMCwgY2FjaGUuc2l6ZSlcblxuICBjb25zdCBDb21wb25lbnQgPSBjcmVhdGVDb21wb25lbnQ8TW9kZWw+KG1vZGVsID0+XG4gICAgPGxhYmVsPnk9e21vZGVsLnl9PC9sYWJlbD5cbiAgKVxuICBjb25zdCBtb2RlbCA9IG5ldyBNb2RlbCgpXG4gIGNvbnN0IHdyYXBwZXIgPSBtb3VudCg8Q29tcG9uZW50IG1vZGVsPXttb2RlbH0gLz4pXG4gIHQuaXMoJ3k9MScsIHdyYXBwZXIuZmluZCgnbGFiZWwnKS50ZXh0KCkpXG4gIG1vZGVsLngrK1xuICB0LmlzKCd5PTInLCB3cmFwcGVyLmZpbmQoJ2xhYmVsJykudGV4dCgpKVxufSlcblxudGVzdCgnY3JlYXRlRWxlbWVudCcsIHQgPT4ge1xuICBjb25zdCBDb21wb25lbnQgPSAobW9kZWw6IE1vZGVsKSA9PiA8bGFiZWw+eD17bW9kZWwueH0sIHk9e21vZGVsLnl9PC9sYWJlbD5cbiAgY29uc3QgbW9kZWwgPSBuZXcgTW9kZWwoKVxuXG4gIHQuaXMoMCwgY2FjaGUuc2l6ZSlcbiAgY29uc3QgZWxlbSA9IGNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50LCBtb2RlbClcbiAgdC5pcygxLCBjYWNoZS5zaXplKVxuXG4gIGNvbnN0IHdyYXBwZXIgPSBtb3VudChlbGVtKVxuXG4gIHQuaXMoJ3g9MCwgeT0xJywgd3JhcHBlci5maW5kKCdsYWJlbCcpLnRleHQoKSlcbiAgbW9kZWwueCsrXG4gIHQuaXMoJ3g9MSwgeT0yJywgd3JhcHBlci5maW5kKCdsYWJlbCcpLnRleHQoKSlcbn0pXG5cbnRlc3QoJ2NhY2hpbmcgY3JlYXRlQ29tcG9uZW50JywgdCA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9ICgpID0+IDxkaXYgLz5cblxuICB0LmlzKDAsIGNhY2hlLnNpemUpXG4gIHQuaXModW5kZWZpbmVkLCBjYWNoZS5nZXQoQ29tcG9uZW50KSlcblxuICAvLyBGaXJzdCBjcmVhdGlvbjsgY29tcG9uZW50IHdyYXBwZXIgZ2V0cyBjYWNoZWRcbiAgY3JlYXRlRWxlbWVudChDb21wb25lbnQsIHt9KVxuICB0LmlzKDEsIGNhY2hlLnNpemUpXG4gIGNvbnN0IGNhY2hlZCA9IGNhY2hlLmdldChDb21wb25lbnQpXG4gIHQubm90KHVuZGVmaW5lZCwgY2FjaGVkKVxuXG4gIC8vIFNlY29uZCBjcmVhdGlvbiBvZiBzYW1lIGNvbXBvbmVudDsgd3JhcHBlciBnZXRzIHJldXNlZFxuICBjcmVhdGVFbGVtZW50KENvbXBvbmVudCwge30pXG4gIHQuaXMoMSwgY2FjaGUuc2l6ZSlcbiAgY29uc3QgY2FjaGVkMiA9IGNhY2hlLmdldChDb21wb25lbnQpXG4gIHQuaXMoY2FjaGVkLCBjYWNoZWQyKVxuXG4gIC8vIENyZWF0aW5nIGFuIGVsZW1lbnQgZm9yIGEgbmV3IGNvbXBvbmVudDsgZ2V0cyBjYWNoZWQgc2VwYXJhdGVseVxuICBjcmVhdGVFbGVtZW50KCgpID0+IDxkaXYgLz4sIHt9KVxuICB0LmlzKDIsIGNhY2hlLnNpemUpXG4gIHQubm90KHVuZGVmaW5lZCwgY2FjaGVkKVxufSlcblxudGVzdCgnY2FjaGluZyBjcmVhdGVFbGVtZW50JywgdCA9PiB7XG4gIGNvbnN0IENvbXBvbmVudCA9ICgpID0+IDxkaXYgLz5cblxuICB0LmlzKDAsIGNhY2hlLnNpemUpXG4gIHQuaXModW5kZWZpbmVkLCBjYWNoZS5nZXQoQ29tcG9uZW50KSlcblxuICAvLyBGaXJzdCBjcmVhdGlvbjsgY29tcG9uZW50IHdyYXBwZXIgZ2V0cyBjYWNoZWRcbiAgY29uc3Qgd3JhcHBlZCA9IGNyZWF0ZUNvbXBvbmVudChDb21wb25lbnQpXG4gIHQuaXMoMSwgY2FjaGUuc2l6ZSlcbiAgdC5pcyh3cmFwcGVkLCBjYWNoZS5nZXQoQ29tcG9uZW50KSlcblxuICAvLyBTZWNvbmQgY3JlYXRpb24gb2Ygc2FtZSBjb21wb25lbnQ7IHdyYXBwZXIgZ2V0cyByZXVzZWRcbiAgY29uc3Qgd3JhcHBlZDIgPSBjcmVhdGVDb21wb25lbnQoQ29tcG9uZW50KVxuICB0LmlzKDEsIGNhY2hlLnNpemUpXG4gIHQuaXMod3JhcHBlZCwgd3JhcHBlZDIpXG5cbiAgLy8gQ3JlYXRpbmcgYW4gZWxlbWVudCBmb3IgYSBuZXcgY29tcG9uZW50OyBnZXRzIGNhY2hlZCBzZXBhcmF0ZWx5XG4gIGNvbnN0IENvbXBvbmVudDIgPSAoKSA9PiA8ZGl2IC8+XG4gIGNvbnN0IHdyYXBwZWQzID0gY3JlYXRlQ29tcG9uZW50KENvbXBvbmVudDIpXG4gIHQuaXMoMiwgY2FjaGUuc2l6ZSlcbiAgdC5pcyh3cmFwcGVkMywgY2FjaGUuZ2V0KENvbXBvbmVudDIpKVxufSlcbiJdfQ==