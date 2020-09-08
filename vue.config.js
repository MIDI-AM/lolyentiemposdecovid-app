module.exports = {
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
          args[0].title = 'Loly en tiempos de Covid con Kike y Gaby'
          return args
        })
        
        
      },
    pwa: {
        workboxOptions: {
            skipWaiting: true
        },
    },
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.(pdf)(\?.*)?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  name: 'files/[name].[hash:8].[ext]'
                }
              }
            ]
          }
        ]
      }
    }
}

