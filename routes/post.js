var express = require("express");
var router = express.Router();
var { auth, adminAuth } = require("../middlewares/auth");

const fakeUserPost = [
  {
    id: "1",
    title: "user post 1",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Sit amet nulla facilisi morbi tempus iaculis urna id.",
  },
  {
    id: "2",
    title: "user post 2",
    body: "Tempus iaculis urna id volutpat lacus laoreet non. At augue eget arcu dictum. Suspendisse in est ante in nibh mauris cursus mattis molestie. Sem viverra aliquet eget sit amet. Nisi vitae suscipit tellus mauris a diam maecenas sed.",
  },
  {
    id: "3",
    title: "user post 3",
    body: "Nam at lectus urna duis convallis convallis. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Sit amet aliquam id diam maecenas ultricies. Urna porttitor rhoncus dolor purus. Tincidunt dui ut ornare lectus.",
  },
];

const fakeAdminPost = [
  {
    id: "1",
    title: "admin post 1",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tincidunt ornare massa eget egestas purus viverra accumsan. Sit amet nulla facilisi morbi tempus iaculis urna id.",
  },
  {
    id: "2",
    title: "admin post 2",
    body: "Tempus iaculis urna id volutpat lacus laoreet non. At augue eget arcu dictum. Suspendisse in est ante in nibh mauris cursus mattis molestie. Sem viverra aliquet eget sit amet. Nisi vitae suscipit tellus mauris a diam maecenas sed.",
  },
  {
    id: "3",
    title: "admin post 3",
    body: "Nam at lectus urna duis convallis convallis. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Sit amet aliquam id diam maecenas ultricies. Urna porttitor rhoncus dolor purus. Tincidunt dui ut ornare lectus.",
  },
];

router.get("/user/list", auth, async function (req, res) {
  try {
    // FAKE SERVER DELAY
    await new Promise((r) => {
      setTimeout(r, 1000);
    });
    const titles = fakeUserPost.map((content) => content.title);
    res.status(200).json(titles);
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.get("/user/detail/:id", auth, async function (req, res) {
  const { id } = req.params;
  try {
    if (/^\d+$/.test(id))
      return res.status(400).json({
        name: "BadRequest",
        message: "bad id format, make sure id only contains number",
      });

    // FAKE SERVER DELAY
    await new Promise((r) => {
      setTimeout(r, 1000);
    });
    const post = fakeUserPost.find((c) => c.id === id);

    if (!post)
      return res.status(404).json({
        name: "NotFound",
        message: `there's not post with id "${id}"`,
      });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.get("/admin/detail/:id", adminAuth, async function (req, res) {
  const { id } = req.params;
  try {
    if (/^\d+$/.test(id))
      return res.status(400).json({
        name: "BadRequest",
        message: "bad id format, make sure id only contains number",
      });

    // FAKE SERVER DELAY
    await new Promise((r) => {
      setTimeout(r, 1000);
    });
    const post = fakeAdminPost.find((c) => c.id === id);

    if (!post)
      return res.status(404).json({
        name: "NotFound",
        message: `there's not post with id "${id}"`,
      });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.get("/admin/list", adminAuth, async function (req, res) {
  try {
    // FAKE SERVER DELAY
    await new Promise((r) => {
      setTimeout(r, 1000);
    });
    const titles = fakeAdminPost.map((content) => content.title);
    res.status(200).json(titles);
  } catch (error) {
    res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
});

router.put("/user/detail/:id", auth, async function (req, res) {
  // FAKE SERVER DELAY
  await new Promise((r) => {
    setTimeout(r, 1000);
  });
  return res.status(204).send();
});

router.delete("/user/detail/:id", auth, async function (req, res) {
  // FAKE SERVER DELAY
  await new Promise((r) => {
    setTimeout(r, 1000);
  });
  return res.status(204).send();
});

router.put("/admin/detail/:id", adminAuth, async function (req, res) {
  // FAKE SERVER DELAY
  await new Promise((r) => {
    setTimeout(r, 1000);
  });
  return res.status(204).send();
});

router.delete("/admin/detail/:id", adminAuth, async function (req, res) {
  // FAKE SERVER DELAY
  await new Promise((r) => {
    setTimeout(r, 1000);
  });
  return res.status(204).send();
});

module.exports = router;
