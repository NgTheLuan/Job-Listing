import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

function CrudCategory() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState('');
  const [cateicon, setCateIcon] = useState('');
  const [catetotal, setCateTotal] = useState(0);
  const [callback, setCallBack] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState('');

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        await axios.put(`/api/categories/${id}`, {
          career: { careerName: category, icon: cateicon, total: catetotal },
        });
        Swal.fire('Awesome!', "You're successfully updated!", 'success').then((result) => {
          if (result.isConfirmed || result.isDismissed) {
          }
        });
      } else {
        await axios.post('/api/categories', {
          career: { careerName: category, icon: cateicon, total: catetotal },
        });
        Swal.fire('Awesome!', "You're successfully created!", 'success').then((result) => {
          if (result.isConfirmed || result.isDismissed) {
          }
        });
      }

      //Reset Form
      setCategory('');
      setCateIcon('');
      setCateTotal(0);

      setOnEdit(false);
      setCallBack(!callback);

      // console.log(res);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const editCategory = async (id, name, total, icon) => {
    setID(id);
    setCategory(name);
    setCateTotal(total);
    setCateIcon(icon);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`api/categories/${id}`);
      Swal.fire('Awesome!', "You're successfully deleted!", 'success').then((result) => {
        if (result.isConfirmed || result.isDismissed) {
        }
      });
      setCallBack(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <>
      <section
        className="inner-header-title"
        style={{
          backgroundImage: `URL("https://www.mediafire.com/convkey/1c5e/tqju2ifqlf8e8dx6g.jpg")`,
        }}
      >
        <div className="container">
          <h1> </h1>
        </div>
      </section>

      <section className="bottom-search-form">
        <div className="container">
          <form className="bt-form" onSubmit={createCategory}>
            <div className="col-md-3 col-sm-6">
              <input
                name="category name"
                type="text"
                className="form-control"
                placeholder="Category name"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="col-md-2 col-sm-6">
              <input
                name="total"
                type="number"
                min="0"
                className="form-control"
                placeholder="Total"
                value={catetotal}
                required
                onChange={(e) => setCateTotal(e.target.value)}
              />
            </div>
            <div className="col-md-4 col-sm-6">
              <input
                name="icon"
                type="url"
                className="form-control"
                placeholder="Link icon"
                value={cateicon}
                required
                onChange={(e) => setCateIcon(e.target.value)}
              />
            </div>
            <div className="col-md-3 col-sm-6">
              <button type="submit" className="btn btn-primary">
                {onEdit ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className="container">
        <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: '#07B107' }}>Categories Manager</h1>
        <br />

        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: '#C2C2C2' }}>
              <th style={{ textAlign: 'center' }}>ID Category</th>
              <th style={{ textAlign: 'center' }}>Name</th>
              <th style={{ textAlign: 'center' }}>Total</th>
              <th style={{ textAlign: 'center' }}>Icon</th>
              <th style={{ textAlign: 'center' }}>Control</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => {
              return (
                <>
                  <tr>
                    <td style={{ textAlign: 'center', width: '30%' }}>{category._id}</td>
                    <td style={{ textAlign: 'center', width: '30%' }}>{category.career.careerName}</td>
                    <td style={{ textAlign: 'center', width: '10%' }}>{category.career.total}</td>
                    <td style={{ textAlign: 'center', width: '5%' }}>
                      <a h={category.career.icon} href=' '>
                        <img src={category.career.icon} className="img-responsive" alt="" />
                      </a>
                    </td>
                    <td>
                      <div style={{ textAlign: 'center' }}>
                        <i
                          className="fas fa-edit"
                          style={{ fontSize: '180%', paddingRight: '5%', cursor: 'pointer', color: '#00DD00' }}
                          onClick={() =>
                            editCategory(
                              category._id,
                              category.career.careerName,
                              category.career.total,
                              category.career.icon
                            )
                          }
                        ></i>
                        <i
                          className="fas fa-trash-alt"
                          style={{ fontSize: '180%', paddingLeft: '5%', cursor: 'pointer', color: '#FF0033' }}
                          onClick={() => deleteCategory(category._id)}
                        ></i>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CrudCategory;
