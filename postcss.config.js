module.exports = {
  plugins: [
    require('postcss-flexbugs-fixes'), // 一个修复flexbox问题的PostCSS插件
    require('autoprefixer')({
      Browserslist: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 11' // 只支持ie 11以上
      ],
      flexbox: 'no-2009'
    })
  ]
};
