switch (process.env.ASPNETCORE_ENVIRONMENT) {
    case 'Development':
        module.exports = require('./config/webpack.dev');
        break;
    case 'Production':
        module.exports = require('./config/webpack.prod');
        break;
    default:
        module.exports = require('./config/webpack.dev');
        break;
}

/**
 * CONFIGURATION
 * 
 * entry
 * output 
 * library - means entry modules (js files) will fall into the appropriate modules - ????????
 * 
 * 1) Require ensure: 
 *      отложенная подгрузка модуля. модуль подгружаеться когда выполнение кода доходит до require('some_module') 
 *      
 * 
 * 2) Require context: 
 * 
 * 3) require + regex => require.context
 * 
 * ===================================================================================
 * 
 * LOADERS
 * loaders allow to preprocess files as you require() or "load" them.
 * you can specify loader for file in statement in _require()_ or in _config_
 * 
 * less|sass|stylus - resolve url - этот параметр лоадера, используеться когда есть less файл в 
 * котором вложен другой less файл из другого места, и для того что бы пути во втором файле коректно 
 * трансформировались используеться опция resolve url
 * watch: https://www.youtube.com/watch?v=2s6-1VIVwPo&list=PLDyvV36pndZHfBThhg4Z0822EEG9VGenn&index=33
 * 
 * ===================================================================================
 * 
 * PLUGINS
 * 
 * PROVIDE PLUGIN - указываються внешние зависимости, для какого-то отдельного елемента из 
 * жирной сборки. Например: мы заюзали underscore.sort() нам не нужен весь underscore, а только 
 * sort, при этом можно не делать let _ = require(underscore); 
 * теперь мы можем использовать sort(), без _; sort - становиться free variable;
 * (free variable доступны благодаря webpack; webpack - сам понимает что и как)
 * recomendations: использовать только для глобальных библиотек
 * 
 * COMMON CHUNK PLUGIN - вынос одинаковых модулей в отдельный common файл. 
 * 
 * 
 * 
 * ContextReplacementPlugin
 * 
 * ExtractTextPlugin
 * 
 * ===================================================================================
 * 
 * MODULES
 * 
 * noParse - используеться для больших библиотек, таких для которых не нужно парсить все require,
 * так как за частую большие библиотеки, просто без вложеных вызовов require
 * 
 */