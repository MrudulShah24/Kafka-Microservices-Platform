export const checkServiceHealth = async (
  url: string
) => {

  try {

    const response =
      await fetch(url);

    return response.ok;

  } catch {

    return false;

  }

};