module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serv: {
        files: [
          'src/*.js'
        ],
        tasks:['exec:npm'],
        options: {
          spawn: false
        }
      }
    },
    exec: {
      npm: 'npm run build-dev'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['watch:serv']);
}
