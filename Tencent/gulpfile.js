//CommonJs规范
const gulp = require("gulp");
//拷贝html文件
gulp.task("html",function(){
	return gulp.src("*.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})

//拷贝img图片
gulp.task("images",function(){
	return gulp.src("*.{jpg,png}")
	.pipe(gulp.dest("dist/image"))
	.pipe(connect.reload());
})
//拷贝json数据
gulp.task("data",function(){
	return gulp.src(["*.json","!package.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})
//拷贝css样式
const scss = require("gulp-scss");
const minifyCss = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss1",function(){
	return gulp.src("index.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCss())
	.pipe(rename("index.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload()); 
})

gulp.task("iconfont",function(){
	return gulp.src("iconfont/**/*")
	.pipe(gulp.dest("dist/iconfont"))
	.pipe(connect.reload());
})
gulp.task("reset",function(){
	return gulp.src("reset.css")
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCss())
	.pipe(rename("reset.min.css"))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
//拷贝js样式

gulp.task("scripts",function(){
	return gulp.src(["*.js","!gulpfile.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})


//执行任务
gulp.task("build",["html","images","data","scss1","scripts"],function(){
	console.log("加载成功");
})

//添加监听
gulp.task("watch",function(){

	gulp.watch("*.html",["html"]);
	gulp.watch("*.{jpg,png}",["images"]);
	gulp.watch(["*.json","!package.json"],["data"]);
	gulp.watch("index.scss",["scss1"]);
	gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
	gulp.watch("iconfont/**/*",["iconfont"]);
	gulp.watch("reset.css",["reset"]);
})
//启动服务。实时刷新

const connect = require("gulp-connect"); 

gulp.task("server",function(){
	connect.server({
		root:"dist",
		port:8888,
		livereload:true
	})
})
//设置默认任务
gulp.task("default",["watch","server"]);