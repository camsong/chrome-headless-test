## Usage

启动 chrome headless，版本 >= 59
```sh
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --headless --hide-scrollbars --remote-debugging-port=9222 --disable-gpu
```

当前目录，启动测试页面到端口 8081
```sh
python -m SimpleHTTPServer 8081
```

执行截图脚本，node > 8.1
```sh
node index.js
```


## Reference

* https://developers.google.com/web/updates/2017/04/headless-chrome
* https://github.com/cyrus-and/chrome-remote-interface
