var RecipeDao = require('./../dao/recipe.dao');
module.exports = {
    listAllRecipes: listAllRecipes,
    listRecipesByPid: listRecipesByPid,
    getRecipe: getRecipe,
    createRecipe: createRecipe,
    updateRecipe: updateRecipe,
    deleteRecipe: deleteRecipe
};

function listAllRecipes(req, res) {
    RecipeDao.listRecipes({ isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}
function listRecipesByPid(req, res) {
    RecipeDao.listRecipes({ variety: req.params.varietyId, isDeleted: false }, cb);
    function cb(err, result) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    }
}

function getRecipe(req, res) {
    var recipeId = req.params.recipeId;
    if (!recipeId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    RecipeDao.readRecipe({ _id: recipeId, isDeleted: false }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function createRecipe(req, res) {
    if (!req.body.name) {
        return res.status(500).send({
            errCode: 0,
            errMsg: "Lỗi nhập liệu"
        });
    }
    var dvnInfo = {
        name: req.body.name,
        description: req.body.description || '',
        fertilizer: req.body.fertilizer || [],
        time : req.body.time,
        productRate: req.body.productRate,
        variety: req.body.variety,
        wateringRate: req.body.wateringRate,
    };
    RecipeDao.createRecipe(dvnInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }
        res.status(200).send(result);
    }
}

function updateRecipe(req, res) {
    var RecipeId = req.params.RecipeId;
    var dvnInfo = req.body
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!RecipeId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }

    RecipeDao.updateRecipe(RecipeId, dvnInfo, cb);
    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}

function deleteRecipe(req, res) {
    var RecipeId = req.params.RecipeId;
    if (req.decoded.roles[0].toString() !== 'admin') {
        return status(403).send({
            errCode: 1,
            errMsg: "Bạn không có quyền quản trị"
        });
    }
    if (!RecipeId) {
        return res.status(400).send({
            errCode: 0,
            errMsg: "Không tìm thấy!"
        });
    }


    RecipeDao.updateRecipe(RecipeId, { isDeleted: true, deleteDate: new Date() }, cb);

    function cb(err, result) {
        if (err) {
            return res.status(400).send(err);
        }

        res.status(200).send(result);
    }
}