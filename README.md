# Thunderstone

> Gruntjs tool to generate a report of the used css selectors within html pages.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install thunderstone --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks("thunderstone");
```

## The "thunderstone" task

### Overview
In your project's Gruntfile, add a section named `thunderstone` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	thunderstone: {
	    html: ["example/*.html"],
	    css: ["example/*.css"],
	    outputDir: "results/"
	}
});
```

### Options

#### html
Type: `Array of String`

Array of html patterns to process

#### css
Type: `Array of String`

Array of css patterns to process

#### outputDir
Type: `String`

Relative folder path to save the results

### Usage Examples

#### Custom Options
In this example, the matching html files and css files will be processed. 
The output will be written in the output folder.

```js
grunt.initConfig({
	thunderstone: {
	    html: ["*.html"],
	    css: ["*.css"],
	    outputDir: "output/"
	}
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Edit template
If you want to change the output file templates. Change the **.vash** file in the templates/ folder.
[Learn more about vash](https://github.com/kirbysayshi/vash)

## Tests

Run ```grunt tests``` to execute the tests.

## Release History

### 1.1.0

Finally figured out all the pieces to make the ```grunt.loadNpmTasks("thunderstone")``` working.