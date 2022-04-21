const path = require("path");
const fs = require("fs/promises");

const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, resp) => {
	const { _id } = req.user;
	const { path: tempUpload, filename } = req.file;
	const [ extention ] = filename.split(".").reverse();
	const newFileName = `${_id}.${extention}`;

	const resultUpload = path.join(avatarsDir, newFileName);

	await fs.rename(tempUpload, resultUpload);

	const avatarUrl = path.join("avatars", newFileName);

	await User.findByIdAndUpdate(_id, { avatarUrl });
	resp.status(200).json({
		avatarUrl
	});
};

module.exports = updateAvatar;