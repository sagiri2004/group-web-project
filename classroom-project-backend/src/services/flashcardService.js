const db = require("~/models");

const insertInMiddle = async (setId, cardId, orderIndex) => {
  try {
    // Tìm flashcardOrder hiện tại
    const flashcardOrder = await db.FlashcardOrder.findOne({
      where: { flashcardSetId: setId, flashcardId: cardId },
    });

    if (!flashcardOrder) {
      return {
        message: "Flashcard order not found",
      };
    }

    const oldOrderIndex = flashcardOrder.orderIndex;

    // Cập nhật orderIndex của flashcardOrder hiện tại
    await flashcardOrder.update({ orderIndex });

    if (orderIndex > oldOrderIndex) {
      // Nếu orderIndex mới lớn hơn oldOrderIndex, cập nhật các bản ghi khác
      const flashcardOrders = await db.FlashcardOrder.findAll({
        where: {
          flashcardSetId: setId,
          orderIndex: {
            [db.Sequelize.Op.gt]: oldOrderIndex,
            [db.Sequelize.Op.lte]: orderIndex,
          },
          flashcardId: { [db.Sequelize.Op.ne]: cardId },
        },
      });

      await Promise.all(
        flashcardOrders.map((flashcardOrder) =>
          flashcardOrder.update({
            orderIndex: flashcardOrder.orderIndex - 1,
          })
        )
      );
    } else if (orderIndex < oldOrderIndex) {
      // Nếu orderIndex mới nhỏ hơn oldOrderIndex, cập nhật các bản ghi khác
      const flashcardOrders = await db.FlashcardOrder.findAll({
        where: {
          flashcardSetId: setId,
          orderIndex: {
            [db.Sequelize.Op.gte]: orderIndex,
            [db.Sequelize.Op.lt]: oldOrderIndex,
          },
          flashcardId: { [db.Sequelize.Op.ne]: cardId },
        },
      });

      await Promise.all(
        flashcardOrders.map((flashcardOrder) =>
          flashcardOrder.update({
            orderIndex: flashcardOrder.orderIndex + 1,
          })
        )
      );
    }

    return {
      message: "Edit flashcard successfully",
    };
  } catch (error) {
    console.error("Error in insertInMiddle:", error);
    return {
      message: "Failed to edit flashcard",
    };
  }
};

const createAndInsertNewFlashcardAtEnd = async (setId, word, definition) => {
  try {
    const flashcard = await db.Flashcard.create({ word, definition });

    const flashcardOrderHighest = await db.FlashcardOrder.findOne({
      where: { flashcardSetId: setId },
      order: [["orderIndex", "DESC"]],
    });

    let flashcardOrderCount = 0;

    if (flashcardOrderHighest) {
      flashcardOrderCount = flashcardOrderHighest.orderIndex + 1;
    }

    await db.FlashcardOrder.create({
      flashcardId: flashcard.id,
      flashcardSetId: setId,
      orderIndex: flashcardOrderCount,
    });

    return flashcard;
  } catch (error) {
    console.error("Error in createAndInsertNewFlashcardAtEnd:", error);
    return null;
  }
};

// get flashcard set
async function getFlashcardSet(flashcardSetId, user) {
  const flashcardSet = await db.FlashcardSet.findOne({
    where: { id: flashcardSetId },
    include: [
      {
        model: db.Flashcard,
        as: "flashcards",
        attributes: ["id", "word", "definition"],
        through: {
          model: db.FlashcardOrder,
          as: "flashcardOrder",
          attributes: [],
        },
      },
    ],
  });

  if (!flashcardSet) {
    return {
      message: "Flashcard set not found",
      data: null,
    };
  }

  const flashcardOrderIds = await db.FlashcardOrder.findAll({
    where: { flashcardSetId },
    attributes: ["flashcardId", "orderIndex"],
  });

  // tra ve array cac id duoc sap xep theo orderIndex
  flashcardOrderIds.sort((a, b) => a.orderIndex - b.orderIndex);

  // chuyen ve dang array cac id
  const flashcardOrderIdsArray = flashcardOrderIds.map(
    (flashcardOrder) => flashcardOrder.flashcardId
  );

  return {
    message: "Fetch flashcard set successfully",
    data: {
      id: flashcardSet.id,
      title: flashcardSet.title,
      description: flashcardSet.description,
      flashcardOrderIds: flashcardOrderIdsArray,
      createdAt: flashcardSet.createdAt,
      updatedAt: flashcardSet.updatedAt,
      flashcards: flashcardSet.flashcards.map((flashcard) => ({
        id: flashcard.id,
        word: flashcard.word,
        definition: flashcard.definition,
      })),
    },
  };
}

// create flashcard set
async function createFlashcardSet(rawFlashcardSetData, user) {
  const { title, description } = rawFlashcardSetData;

  const flashcardSet = await db.FlashcardSet.create({
    title,
    description,
  });

  if (!flashcardSet) {
    return {
      message: "Failed to create flashcard set",
    };
  }

  await db.FlashcardSetUser.create({
    flashcardSetId: flashcardSet.id,
    userId: user.id,
    isCreator: true,
  });

  return {
    message: "Create flashcard set successfully",
    data: {
      flashcardSetID: flashcardSet.id,
      id: flashcardSet.id,
      title: flashcardSet.title,
      description: flashcardSet.description,
    },
  };
}

// edit flashcard
async function editFlashcard(rawData) {
  // rawData co dang nhu sau:
  // [
  //  {
  //   setId: 1,
  //   cardId: 1,
  //   word: "Hello",
  //   definition: "Xin chào",
  //   orderIndex: 0
  //  }
  //  { ... }
  // ]

  // truong hop co 1 object duy nhat trong array rawData
  // thi se co 1 truong hop la thay doi orderIndex
  // khi do phai update lai orderIndex cua flashcardOrder
  // va update lai orderIndex cua cac flashcardOrder khac
  if (
    rawData.length === 1 &&
    rawData[0].cardId !== undefined &&
    rawData[0].orderIndex !== undefined
  ) {
    const { setId, cardId, orderIndex } = rawData[0];

    if (orderIndex !== undefined) {
      const result = await insertInMiddle(setId, cardId, orderIndex);

      return {
        message: result.message,
      };
    }
  }

  // truong hop co nhieu object trong array rawData
  // thi se co 2 truong hop la thay doi noi dung cua flashcard
  // hoac tao moi flashcard
  // truong hop 1: thay doi noi dung cua flashcard
  // object co dang { setId: 1, cardId: 1, word: "Hello", definition: "Xin chào" }
  // truong hop 2: tao moi flashcard
  // object co dang { setId: 1, word: "Hello", definition: "Xin chào", orderIndex: 0 }
  else {
    const flashcardOrderPromises = rawData.map(async (data) => {
      const { setId, cardId, word, definition, orderIndex } = data;

      if (cardId) {
        const flashcard = await db.Flashcard.findOne({
          where: { id: cardId },
        });

        if (!flashcard) {
          return {
            message: "Flashcard not found",
          };
        }

        await flashcard.update({ word, definition });

        return {
          message: "Edit flashcard successfully",
        };
      } else {
        const flashcard = await createAndInsertNewFlashcardAtEnd(
          setId,
          word,
          definition
        );

        if (!flashcard) {
          return {
            message: "Failed to create flashcard",
          };
        }

        const result = await insertInMiddle(setId, flashcard.id, orderIndex);

        return {
          message: result.message,
        };
      }
    });

    await Promise.all(flashcardOrderPromises);

    return {
      message: "Edit flashcard successfully",
    };
  }
}

// delete flashcard set
async function deleteFlashcardSet(flashcardSetId) {
  const flashcardSet = await db.FlashcardSet.findOne({
    where: { id: flashcardSetId },
  });

  if (!flashcardSet) {
    return {
      message: "Flashcard set not found",
    };
  }

  // Tìm các flashcardId liên quan từ FlashcardOrder
  const flashcardOrders = await db.FlashcardOrder.findAll({
    where: { flashcardSetId },
  });

  const flashcardIds = flashcardOrders.map((order) => order.flashcardId);

  // Xóa các bản ghi từ bảng Flashcard dựa trên flashcardIds tìm được
  if (flashcardIds.length > 0) {
    await db.Flashcard.destroy({
      where: { id: flashcardIds },
    });
  }

  // Xóa các bản ghi từ bảng FlashcardOrder dựa trên flashcardSetId
  await db.FlashcardOrder.destroy({
    where: { flashcardSetId },
  });

  // Xóa bản ghi từ bảng FlashcardSet dựa trên flashcardSetId
  await db.FlashcardSet.destroy({
    where: { id: flashcardSetId },
  });

  return {
    message: "Delete flashcard set successfully",
    data: {
      id: flashcardSetId,
    },
  };
}

// delete flashcard
async function deleteFlashcard(flashcardId) {
  const flashcard = await db.Flashcard.findOne({
    where: { id: flashcardId },
  });

  if (!flashcard) {
    return {
      message: "Flashcard not found",
    };
  }

  await db.FlashcardOrder.destroy({
    where: { flashcardId },
  });

  const flashcardOrders = await db.FlashcardOrder.findAll({
    where: { flashcardId: { [db.Sequelize.Op.ne]: flashcardId } },
  });

  flashcardOrders.forEach(async (flashcardOrder, index) => {
    await flashcardOrder.update({ orderIndex: index });
  });

  await db.Flashcard.destroy({
    where: { id: flashcardId },
  });

  return {
    message: "Delete flashcard successfully",

    data: {
      flashcardId,
    },
  };
}

// create flashcard
async function createFlashcard(setId) {
  const flashcard = await createAndInsertNewFlashcardAtEnd(setId, "", "");

  if (!flashcard) {
    return {
      message: "Failed to create flashcard",
    };
  }

  return {
    message: "Create flashcard successfully",
    data: {
      id: flashcard.id,
    },
  };
}

// get my flashcard sets
async function getMyFlashcardSets(user) {
  // lay ra tat ca cac flashcardSetId ma user da tao
  const flashcardSetUsers = await db.FlashcardSetUser.findAll({
    where: { userId: user.id, isCreator: true },
    attributes: ["flashcardSetId"],
    raw: true,
  });

  const flashcardSetIds = flashcardSetUsers.map((item) => item.flashcardSetId);

  // lay ra ca nguoi da tao
  const flashcardSets = await db.FlashcardSet.findAll({
    where: { id: flashcardSetIds },
    attributes: ["id", "title", "description"],
    raw: true,
    // sap xep theo thoi gian tao gan day -> cu
    order: [["createdAt", "DESC"]],
  });

  return {
    message: "Fetch my flashcard sets successfully",
    data: flashcardSets,
  };
}

//lay ra user tao ra flashcard set bang flashcardSetId
async function getUserByFlashcardSetId(flashcardSetId) {
  const flashcardSetUser = await db.FlashcardSetUser.findOne({
    where: { flashcardSetId, isCreator: true },
    include: [
      {
        model: db.User,
        as: "user",
        attributes: ["id", "name", "avatar"],
      },
    ],
  });

  if (!flashcardSetUser) {
    return {
      message: "User not found",
      data: null,
    };
  }

  const user = flashcardSetUser.user;

  return {
    message: "Fetch user successfully",
    data: {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    },
  };
}

module.exports = {
  getFlashcardSet,
  createFlashcardSet,
  editFlashcard,
  deleteFlashcardSet,
  deleteFlashcard,
  createFlashcard,
  getMyFlashcardSets,
  getUserByFlashcardSetId,
};
