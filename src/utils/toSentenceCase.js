
export default (str) => {
   let out = str.replace(/^\s*/, "");  // strip leading spaces
   out = out.replace(/^[a-z]|[^\s][A-Z]/g, function(str, offset) {
        if (offset == 0) {
            return(str.toUpperCase());
        } else {
            return(str.substr(0,1) + " " + str.substr(1).toUpperCase());
        }
   });
   return(out);
};