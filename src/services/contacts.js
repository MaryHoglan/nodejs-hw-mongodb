import { Contact } from '../models/contact.js';


const calculatePaginationData = (count, page, perPage) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

export async function getAllContacts(
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  userId,
) {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const limit = perPage;

  const query = Contact.find({userId});

  if (typeof filter?.type !== 'undefined') {
    query.where('contactType').equals(filter.type);
  }

  if (typeof filter?.isFavourite !== 'undefined') {
    query.where('isFavourite').equals(filter.isFavourite);
  }

  const [totalCount, contacts] = await Promise.all([
    query.clone().countDocuments(),
    query
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
  ]);

  const paginationData = calculatePaginationData(totalCount, page, perPage);

  return { data: contacts, ...paginationData };
}

export async function getContactById(id, userId) {
  return await Contact.findById({ _id: id, userId });
}

export async function createContact(payload) {
  return Contact.create(payload);
}

export async function updateContact(id, payload, userId) {
  return Contact.findByIdAndUpdate({ _id: id, userId }, payload, {
    new: true,
  });
}

export async function deleteContact(id, userId) {
  return Contact.findByIdAndDelete({ _id: id, userId });
}


