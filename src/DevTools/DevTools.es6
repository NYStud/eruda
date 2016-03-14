import NavBar from './NavBar.es6'
import util from '../util'

require('./DevTools.scss');

export default class DevTools
{
    constructor($parent)
    {
        this._$parent = $parent;
        this._isShow = false;
        this._tools = {};

        this._appendTpl();
        this._initNavBar();
    }
    show()
    {
        this._isShow = true;

        this._$el.addClass('eruda-show').rmClass('eruda-hide');

        return this;
    }
    hide()
    {
        this._isShow = false;

        this._$el.addClass('eruda-hide').rmClass('eruda-show');
        setTimeout(() => this._$el.rmClass('eruda-hide'), 300);

        return this;
    }
    toggle()
    {
        return this._isShow ? this.hide() : this.show();
    }
    add(tool)
    {
        var name = tool.name;

        this._$tools.append('<div class="eruda-' + name + ' eruda-tool"></div>');
        tool.init(this._$tools.find('.eruda-' + name));
        tool.active = false;
        this._tools[name] = tool;

        this._navBar.add(name);

        return this;
    }
    get(name)
    {
        var tool = this._tools[name];

        if (tool) return tool;
    }
    showTool(name)
    {
        var tools = this._tools;

        var tool = tools[name];
        if (!tool) return;

        util.each(tools, (tool) =>
        {
            tool.active = false;
            tool.hide();
        });

        tool.active = true;
        tool.show();

        this._navBar.activeTool(name);

        return this;
    }
    _appendTpl()
    {
        var $parent = this._$parent;

        $parent.append(require('./DevTools.hbs')());

        this._$el = $parent.find('.eruda-dev-tools');
        this._$tools = this._$el.find('.eruda-tools');
    }
    _initNavBar()
    {
        this._navBar = new NavBar(this._$el.find('.eruda-nav-bar ul'));
        this._navBar.on('showTool', (name) =>
        {
            this.showTool(name);
        });
    }
}