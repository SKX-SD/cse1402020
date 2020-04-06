(function(){"use strict"
var t,i,n=524288,e=zip.TextWriter,r=zip.BlobWriter,o=zip.Data64URIWriter,a=zip.Reader,c=zip.TextReader,s=zip.BlobReader,u=zip.Data64URIReader,f=zip.createReader,p=zip.createWriter
function d(t){var i,n=this
n.size=0,n.init=function(i){n.size=t.uncompressedSize,i()},n.readUint8Array=function(e,o,a,c){(function(e){n.data?e():t.getData(new r,function(t){n.data=t,i=new s(t),e()},null,n.checkCrc32)})(function(){i.readUint8Array(e,o,a,c)})}}function h(t){var i=0
return function t(n){i+=n.uncompressedSize||0,n.children.forEach(t)}(t),i}function l(t,i,n){var e=0
function r(){++e<t.children.length?o(t.children[e]):i()}function o(t){t.directory?l(t,r,n):(t.reader=new t.Reader(t.data,n),t.reader.init(function(){t.uncompressedSize=t.reader.size,r()}))}t.children.length?o(t.children[e]):i()}function y(t){var i=t.parent.children
i.forEach(function(n,e){n.id==t.id&&i.splice(e,1)})}function m(t,i,n,e){i.isDirectory?function t(i,n,r){(function(t,i){var n=[]
if(t.isDirectory){var r=t.createReader();(function t(){r.readEntries(function(e){e.length?(n=n.concat(e),t()):i(n)},e)})()}t.isFile&&i(n)})(n,function(n){var o=0
function a(){var c=n[o]
c?function(n){function r(i){t(i,n,function(){o++,a()})}n.isDirectory&&r(i.addDirectory(n.name)),n.isFile&&n.file(function(t){var e=i.addBlob(n.name,t)
e.uncompressedSize=t.size,r(e)},e)}(c):r()}a()})}(t,i,n):i.file(function(e){t.addBlob(i.name,e),n()},e)}function g(t,i,n,e,r,o,a){var c=0
i.directory?function t(i,n,e,r,o,s){var u=0
function f(){var p=n.children[u]
p?function(n){function e(i){c+=n.uncompressedSize||0,t(i,n,function(){u++,f()},r,o,s)}n.directory?i.getDirectory(n.name,{create:!0},e,o):i.getFile(n.name,{create:!0},function(t){n.getData(new zip.FileWriter(t,zip.getMimeType(n.name)),e,function(t){r&&r(c+t,s)},a)},o)}(p):e()}f()}(t,i,n,e,r,o):i.getData(new zip.FileWriter(t,zip.getMimeType(i.name)),n,e,a)}function z(t){t.entries=[],t.root=new x(t)}function D(t,i,n,e){if(t.directory)return e?new x(t.fs,i,n,t):new w(t.fs,i,n,t)
throw"Parent entry is not a directory."}function v(){}function w(t,i,n,e){v.prototype.init.call(this,t,i,n,e),this.Reader=n.Reader,this.Writer=n.Writer,this.data=n.data,n.getData&&(this.getData=n.getData)}function x(t,i,n,e){v.prototype.init.call(this,t,i,n,e),this.directory=!0}function R(){z(this)}d.prototype=new a,d.prototype.constructor=d,d.prototype.checkCrc32=!1,v.prototype={init:function(t,i,n,e){if(t.root&&e&&e.getChildByName(i))throw"Entry filename already exists."
n||(n={}),this.fs=t,this.name=i,this.id=t.entries.length,this.parent=e,this.children=[],this.zipVersion=n.zipVersion||20,this.uncompressedSize=0,t.entries.push(this),e&&this.parent.children.push(this)},getFileEntry:function(t,i,n,e,r){var o=this
l(o,function(){g(t,o,i,n,e,h(o),r)},e)},moveTo:function(t){if(!t.directory)throw"Target entry is not a directory."
if(t.isDescendantOf(this))throw"Entry is a ancestor of target entry."
if(this!=t){if(t.getChildByName(this.name))throw"Entry filename already exists."
y(this),this.parent=t,t.children.push(this)}},getFullname:function(){for(var t=this.name,i=this.parent;i;)t=(i.name?i.name+"/":"")+t,i=i.parent
return t},isDescendantOf:function(t){for(var i=this.parent;i&&i.id!=t.id;)i=i.parent
return!!i}},v.prototype.constructor=v,w.prototype=t=new v,t.constructor=w,t.getData=function(t,i,e,r){var o=this
!t||t.constructor==o.Writer&&o.data?i(o.data):(o.reader||(o.reader=new o.Reader(o.data,r)),o.reader.init(function(){t.init(function(){(function(t,i,e,r,o){var a=0;(function c(){var s=a*n
r&&r(s,t.size),s<t.size?t.readUint8Array(s,Math.min(n,t.size-s),function(t){i.writeUint8Array(new Uint8Array(t),function(){a++,c()})},o):i.getData(e)})()})(o.reader,t,i,e,r)},r)}))},t.getText=function(t,i,n,r){this.getData(new e(r),t,i,n)},t.getBlob=function(t,i,n,e){this.getData(new r(t),i,n,e)},t.getData64URI=function(t,i,n,e){this.getData(new o(t),i,n,e)},x.prototype=i=new v,i.constructor=x,i.addDirectory=function(t){return D(this,t,null,!0)},i.addText=function(t,i){return D(this,t,{data:i,Reader:c,Writer:e})},i.addBlob=function(t,i){return D(this,t,{data:i,Reader:s,Writer:r})},i.addData64URI=function(t,i){return D(this,t,{data:i,Reader:u,Writer:o})},i.addFileEntry=function(t,i,n){m(this,t,i,n)},i.addData=function(t,i){return D(this,t,i)},i.importBlob=function(t,i,n){this.importZip(new s(t),i,n)},i.importText=function(t,i,n){this.importZip(new c(t),i,n)},i.importData64URI=function(t,i,n){this.importZip(new u(t),i,n)},i.exportBlob=function(t,i,n){this.exportZip(new r("application/zip"),t,i,n)},i.exportText=function(t,i,n){this.exportZip(new e,t,i,n)},i.exportFileEntry=function(t,i,n,e){this.exportZip(new zip.FileWriter(t,"application/zip"),i,n,e)},i.exportData64URI=function(t,i,n){this.exportZip(new o("application/zip"),t,i,n)},i.importZip=function(t,i,n){var e=this
f(t,function(t){t.getEntries(function(t){t.forEach(function(t){var i=e,n=t.filename.split("/"),r=n.pop()
n.forEach(function(t){i=i.getChildByName(t)||new x(e.fs,t,null,i)}),t.directory||D(i,r,{data:t,Reader:d})}),i()})},n)},i.exportZip=function(t,i,n,e){var r=this
l(r,function(){p(t,function(t){(function(t,i,n,e,r){var o=0;(function t(i,n,e,r,a){var c=0;(function s(){var u=n.children[c]
u?i.add(u.getFullname(),u.reader,function(){o+=u.uncompressedSize||0,t(i,u,function(){c++,s()},r,a)},function(t){r&&r(o+t,a)},{directory:u.directory,version:u.zipVersion}):e()})()})(t,i,n,e,r)})(t,r,function(){t.close(i)},n,h(r))},e)},e)},i.getChildByName=function(t){var i,n
for(i=0;i<this.children.length;i++)if((n=this.children[i]).name==t)return n},R.prototype={remove:function(t){y(t),this.entries[t.id]=null},find:function(t){var i,n=t.split("/"),e=this.root
for(i=0;e&&i<n.length;i++)e=e.getChildByName(n[i])
return e},getById:function(t){return this.entries[t]},importBlob:function(t,i,n){z(this),this.root.importBlob(t,i,n)},importText:function(t,i,n){z(this),this.root.importText(t,i,n)},importData64URI:function(t,i,n){z(this),this.root.importData64URI(t,i,n)},exportBlob:function(t,i,n){this.root.exportBlob(t,i,n)},exportText:function(t,i,n){this.root.exportText(t,i,n)},exportFileEntry:function(t,i,n,e){this.root.exportFileEntry(t,i,n,e)},exportData64URI:function(t,i,n){this.root.exportData64URI(t,i,n)}}
zip.fs={FS:R,ZipDirectoryEntry:x,ZipFileEntry:w},zip.getMimeType=function(){return"application/octet-stream"}})()
