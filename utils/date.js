exports.getDay = function(){

    const day = new Date();

    const options = {

        weekday: "long"

    };

    return day.toLocaleDateString("en-US", options);

};

exports.getDate = function(){

    const today = new Date();

    const options = {

        year: "numeric",
        day: "numeric",
        month: "long"

    };

    return today.toLocaleDateString("en-US", options);

};
